<?php

namespace Spatie\GoogleTagManager;

use Illuminate\Support\ServiceProvider;
use Spatie\GoogleTagManager\GoogleTagManager;

class EimzoServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     */
    public function boot()
    {
        $this->publishes([
            __DIR__.'/../resources/assets/' => public_path('vendor/eimzo/assets'),
        ], 'public');
    }
}