<?php

namespace Reflar\PrettyMail;

use Flarum\Foundation\Application;
use Illuminate\Contracts\Events\Dispatcher;

return function (Application $app, Dispatcher $events) {
    $app->register(Providers\MailerProvider::class);

    $events->subscribe(Listeners\AddClientAssets::class);
};
