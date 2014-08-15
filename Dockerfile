FROM node
RUN apt-get install pngquant
ADD . /usr/src/app
WORKDIR /usr/src/app
