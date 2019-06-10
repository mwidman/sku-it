# sku-it
## A sample inventory application that uses docker, django, and angular.

## Prerequisites
- Docker

## Getting started
1. Clone this repo
2. In the root directory of the project, run
    - `docker-compose up`
3. Create a super user:
    1. Open a separate terminal to the project's root directory
    2. Run
        - `docker-compose run web bash`
    3. In the resulting bash prompt change directory to backend:
        - `cd backend`
    4. Run Django's createsuperuser command and follow the prompts to create your super user
        - `python manage.py createsuperuser`
