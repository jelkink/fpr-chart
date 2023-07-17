FROM php:7.4-fpm-alpine

RUN ["/bin/sh", "-c", "rm -rf /var/www; ln -sf /web/src /var/www"]

RUN ln -s /web/lib /var/fpr
RUN ln -s /web/docker/run/secrets /run/secrets
RUN ["/bin/sh", "-c", "ln -s /web/docker/php-fpm/www.conf /usr/local/etc/php-fpm.d/www-1.conf"]

# use some custom config directives
RUN ["/bin/sh", "-c", "ln -s /web/docker/php-fpm/php-custom.ini $PHP_INI_DIR/conf.d/"]

# Use the default production configuration
RUN cp "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

RUN docker-php-ext-install pdo_mysql

CMD ["php-fpm"]

EXPOSE 9000
