@echo off
echo Reiniciando base de datos...

echo Eliminando base de datos existente...
del database\database.sqlite 2>nul

echo Creando nueva base de datos...
echo. > database\database.sqlite

echo Ejecutando migraciones...
php artisan migrate:fresh

echo Poblando con datos mínimos...
php artisan db:seed --class=MinimalDataSeeder

echo Limpiando caché...
php artisan config:clear
php artisan route:clear
php artisan view:clear

echo Base de datos reiniciada exitosamente!
echo Usuario: admin@test.com
echo Contraseña: password
pause 
 