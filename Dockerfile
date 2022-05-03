FROM node:12.18.4

RUN mkdir -p /usr/src/frontend

WORKDIR /usr/src/frontend

COPY . /usr/src/frontend