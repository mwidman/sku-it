FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
RUN mkdir /code/backend
RUN mkdir /code/frontend
WORKDIR /code
COPY ./backend/requirements.txt /code/backend/
RUN pip install -r ./backend/requirements.txt
COPY ./scripts /code/
COPY ./backend /code/
COPY ./frontend /code/
