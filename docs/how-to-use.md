## Customize

1. You can customize default `role_id`(from `config/eimzo.php`) where creating new user:

        'user' => [
             'default_role_id' => env('EIMZO_USER_ROLE_ID', '3')
        ]
    or you can customize from file .env

        EIMZO_USER_ROLE_ID=3

2. You can edit `redirect_url`:

       'after_login_success' => env('EIMZO_REDIRECT_AUTH', '/'),
       'after_login_error' => env('EIMZO_REDIRECT_ERROR', '/'),
