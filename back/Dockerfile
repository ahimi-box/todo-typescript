# ベースイメージ：Apache + PHP8.4
FROM php:8.4-apache

# 必要なライブラリをインストール
RUN apt-get update && apt-get install -y \
    zip unzip git libpq-dev libzip-dev \
    && docker-php-ext-install pdo_mysql zip

# Composer をインストール
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Apache のドキュメントルートを変更
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Apache の rewrite モジュールを有効化
RUN a2enmod rewrite

# 作業ディレクトリ
WORKDIR /var/www/html

# 権限設定（フォルダがなければ作成）
RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache && \
    chown -R www-data:www-data /var/www/html && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
# ポート開放
EXPOSE 80