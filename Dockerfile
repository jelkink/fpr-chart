# base image
FROM node:current-alpine3.17

COPY ./ /web/

RUN apk add git

RUN ln -s /web/frontend /app

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# fix "Error: could not get uid/gid"
# RUN npm config set unsafe-perm true

# install and cache app dependencies
RUN npm install react-scripts@3.0.1 -g
RUN npm install serve@11.3.1 -g
RUN npm install

# create production build
RUN npm run build

RUN ln -s /web/frontend/teachingcharts /web/frontend/teachingcharts/teachingcharts

# start app
CMD serve teachingcharts --debug > /var/log/serve_log.txt 2>&1
