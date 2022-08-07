<?php

use Teamprodev\Eimzo\Http\Controllers\EimzoController;
use Teamprodev\Eimzo\Http\Controllers\EimzoSignController;

Route::group([
    'middleware' => 'web',
    'prefix' => 'eimzo',
    'as' => 'eimzo.',
    'namespace' => 'Teamprodev\Eimzo\Http\Controllers'
], function () {
    Route::get('login', [EimzoController::class,'login'])->name('showLogin');
    Route::post('postLogin', [EimzoController::class,'auth'])->name('postLogin');
    Route::get('sign', [EimzoSignController::class, 'index'])->name('sign.index');
    Route::post('verify', [EimzoSignController::class, 'verifyPks'])->name('sign.verify');
    Route::post('join', [EimzoSignController::class, 'joinTwoPks'])->name('sign.join');
    Route::get('docs', [EimzoSignController::class, 'docsList'])->name('sign.docs');
});
