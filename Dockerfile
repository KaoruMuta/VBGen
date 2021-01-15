FROM ubuntu:latest

RUN apt-get update
RUN apt-get install python3 python3-pip -y
RUN mkdir /code

WORKDIR /code
ADD requirements.txt /code
RUN pip3 install -r requirements.txt