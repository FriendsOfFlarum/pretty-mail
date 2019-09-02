<?php

/*
 * This file is part of reflar/pretty-mail.
 *
 * Copyright (c) ReFlar.
 *
 * https://reflar.redevs.org
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Reflar\PrettyMail;

use Flarum\Extend;
use Flarum\Foundation\Application;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),
    new Extend\Locales(__DIR__.'/resources/locale'),
    function (Application $app) {
        $app->register(Providers\MailerProvider::class);
        /** @var Dispatcher $events */
        $events = $app['events'];
        $events->subscribe(Listeners\InjectSettings::class);
    },
];