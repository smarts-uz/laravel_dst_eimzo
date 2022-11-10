##Installing

1.This package publishes a `config/eimzo.php` file. If you already have a file by that name, you must rename or remove it.

2.You can install the package via composer:

        composer require teamprodev/laravel_dst_eimzo

3.Optional: The service provider will automatically get registered. Or you may manually add the service provider in your config/app.php file:

        'providers' => [
            // ...
            Teamprodev\Eimzo\Providers\EimzoServiceProvider::class,
        ];

4.You should publish [migration](https://github.com/teamprodev/laravel_dst_eimzo/blob/main/src/database/migrations/0000_00_00_000000_create_signed_docs_table.php) and [`config/permission.php` config file](https://github.com/teamprodev/laravel_dst_eimzo/blob/main/src/config/config.php) with:

        php artisan vendor:publish --provider="Teamprodev\Eimzo\Providers\EimzoServiceProvider"

5.Run the migrations: After the config and migration have been published and configured, you can create the tables for this package by running:

        php artisan migrate
