FROM nginx:alpine

RUN rm /etc/nginx/nginx.conf

RUN ln -s /web/src /var/www
RUN ln -s /web/docker/nginx/nginx.conf /etc/nginx/nginx.conf
RUN ln -s /web/docker/nginx/sites/ /etc/nginx/sites-available
RUN ln -sf /web/docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx"]

EXPOSE 80 443
