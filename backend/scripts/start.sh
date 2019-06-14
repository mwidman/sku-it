#!/bin/bash

# Adapted from https://github.com/erroneousboat/docker-django/blob/master/webapp/config/start.sh

set -e

#####
# Postgres: wait until container is created
#####
until python3 /code/scripts/database-check.py; do
    sleep 5; echo "*** Waiting for postgres container ..."
done

#####
# Django setup
#####
if [ "$PRODUCTION" == "true" ]; then
    # Django: migrate
    #
    # Django will see that the tables for the initial migrations already exist
    # and mark them as applied without running them. (Django won’t check that the
    # table schema match your models, just that the right table names exist).
    echo "==> Django setup, executing: migrate"
    python3 /code/manage.py migrate --fake-initial

    # Django: collectstatic
    #
    # This will upload the files to s3 because of django-storages-redux
    # and the setting:
    # STATICFILES_STORAGE = 'storages.backends.s3boto.S3BotoStorage'
    echo "==> Django setup, executing: collectstatic"
    python3 /code/manage.py collectstatic --noinput -v 3

    echo "==> Running gunicorn"
    gunicorn backend.wsgi -b 0.0.0.0:8000
else
    # Django: reset database
    # https://docs.djangoproject.com/en/1.9/ref/django-admin/#flush
    #
    # This will give some errors when there is no database to be flushed, but
    # you can ignore these messages.
    echo "==> Django setup, executing: flush"
    python3 /code/manage.py flush --noinput

    # Django: migrate
    #
    # Django will see that the tables for the initial migrations already exist
    # and mark them as applied without running them. (Django won’t check that the
    # table schema match your models, just that the right table names exist).
    echo "==> Django setup, executing: migrate"
    python3 /code/manage.py migrate --fake-initial

    # Django: collectstatic
    echo "==> Django setup, executing: collectstatic"
    python3 /code/manage.py collectstatic --noinput -v 3

    # Just for test, use built-in webserver for now:
    echo "==> Django setup, starting runserver"
    python3 /code/manage.py runserver 0.0.0.0:8000
fi

