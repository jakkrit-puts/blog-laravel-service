FROM php:8.2-fpm

# ติดตั้ง dependencies ที่จำเป็น
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip \
    libwebp-dev libjpeg-dev libfreetype6-dev && \
    # ติดตั้ง gd extension พร้อมกับ webp, jpeg, freetype support
    docker-php-ext-configure gd --with-webp --with-jpeg --with-freetype && \
    docker-php-ext-install gd

# ติดตั้ง PHP extensions อื่น ๆ
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath

# คัดลอกไฟล์ Composer จาก official image
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage

# รันคำสั่ง Composer
RUN composer install --no-dev --optimize-autoloader \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

RUN php artisan storage:link

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
