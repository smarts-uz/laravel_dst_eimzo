<?php

return [
    'redirect_url' => [
        'after_login_success' => env('EIMZO_REDIRECT_AUTH', '/'),
        'after_login_error' => env('EIMZO_REDIRECT_ERROR', '/'),

    ],
    'dsv_server_url' => env('EIMZO_DSV_SERVER_URL', '127.0.0.1'),
    //not completed
    'telegram' => [
        'bot_token' => env('EIMZO_BOT_TOKEN', ''),
        'chat_id' => env('EIMZO_CHAT_ID', '')

    ],
    //end not completed
    'user' => [
        'default_role_id' => env('EIMZO_USER_ROLE_ID', '1')
    ]

];
