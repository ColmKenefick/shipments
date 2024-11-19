# use php
FROM php:8.1-apache

# install deps
RUN apt-get update && apt-get install -y \
    sqlite3 \
    libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite

# copy code to the container
COPY . /var/www/html

# adjust perms
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# expose port for wed traffic
EXPOSE 80