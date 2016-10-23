FROM ubuntu:latest
MAINTAINER oleg2807@gmail.com

RUN apt-get update
RUN apt-get install -y nodejs nodejs-legacy npm
RUN apt-get clean
RUN npm install -g npm
RUN npm install --global gulp

COPY ./package.json /src/
RUN cd /src && npm install

COPY . /src

WORKDIR /src/

CMD ["gulp", "serve:docker"]
