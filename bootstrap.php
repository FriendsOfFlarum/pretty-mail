<?php

namespace Reflar\PrettyMail;

use Flarum\Foundation\Application;

return function (Application $app) {
    $app->register(Providers\MailerProvider::class);
};
