@echo off
echo Optimizando servidor Laravel para mejor rendimiento...

echo Limpiando cachés...
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

echo Optimizando para producción...
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo Iniciando servidor optimizado...
php -d max_execution_time=300 -d memory_limit=512M -d max_input_time=300 -d opcache.enable=1 -d opcache.memory_consumption=128 -d opcache.interned_strings_buffer=8 -d opcache.max_accelerated_files=4000 artisan serve --host=127.0.0.1 --port=8000

pause 
 