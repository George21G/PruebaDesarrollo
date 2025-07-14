@echo off
echo Iniciando servidor Laravel con configuraciones optimizadas...
php -d max_execution_time=300 -d memory_limit=512M -d max_input_time=300 artisan serve --host=127.0.0.1 --port=8000
pause 
 