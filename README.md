# sku-it
## A sample inventory application that uses docker, django, and angular.

## Prerequisites
- Docker

## Warning
This project creates a Dev environment for a Django backend and Angular frontend. As such, both are hosted using their debug hosting tools in a non-production method. 

You should **NOT** use this as a production environment.

## Getting started
1. Clone this repo
2. In the root directory of the project, run
    - `docker-compose -f docker-compose.dev.yml up`
3. Create a super user:
    1. Open a separate terminal to the project's root directory
    2. Run
        - `docker-compose -f docker-compose.dev.yml run backend bash`
    4. Run Django's createsuperuser command and follow the prompts to create your super user
        - `python manage.py createsuperuser`
4. Navigate to application using a browser at port 8000. Linux users should be able to use localhost:8000 whereas Mac/Windows users will need to know the IP of the virtualbox machine running docker and use that with port 8000 (ex. 192.168.99.100 -> 192.168.99.100:8000).
5. The first page is a dashboard that displays the Skus already created. You can then ship/receive from existing Skus or create new Skus via the FAB.
6. (Optional): Navigate directly to the api endpoints at server:8000/inventory/api and use the Django Rest Framework forms to view or create new objects.

## Explanation
Running docker-compose up will create multiple servers that work together to serve the app.
* db - serves the postgres database. Data will be saved to a named volume that persists between uses.
* backend - serves the Django web application using Django's built-in 'runserver' for now.
* frontend - serves the Angular application using Angular's built-in 'ng serve' for now.
* frontend-test - Runs a karma test environment with chrome headless.
* nginx - provides mapping between requests to the server and their respective components.
