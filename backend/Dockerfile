# Use the official PHP image
FROM php:8.1-apache

# Install system dependencies, including sqlite3 and its development headers
RUN apt-get update && apt-get install -y \
    sqlite3 \
    libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite

# Copy your application code into the container
COPY . /var/www/html

# Set permissions for the web directory
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose port 80 for web traffic
EXPOSE 80