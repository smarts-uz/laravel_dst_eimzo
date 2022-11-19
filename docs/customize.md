## Customize

1. Advised. Customize the url in .env where in the config


2. You can customize default `role_id`(from `config/eimzo.php`) where creating new user:

        'user' => [
             'default_role_id' => env('EIMZO_USER_ROLE_ID', '3')
        ]
   or you can customize from file .env

        EIMZO_USER_ROLE_ID=3

3. You can edit `redirect_url`:

          'after_login_success' => env('EIMZO_REDIRECT_AUTH', '/'),
          'after_login_error' => env('EIMZO_REDIRECT_ERROR', '/'),
   .env

           EIMZO_REDIRECT_AFTER_SIGN="home"
4. You should put to .env url where run DSV Server:

         EIMZO_DSV_SERVER_URL="http://127.0.0.1:9090/dsvs/pkcs7/v1"