<?php

/*
 * This file is part of fof/pretty-mail.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\PrettyMail\Providers;

use Flarum\Foundation\AbstractServiceProvider;
use FoF\PrettyMail\Mailer;

class MailerProvider extends AbstractServiceProvider
{
    public function boot()
    {
        // Mostly copy-pasted from https://github.com/illuminate/mail/blob/v5.1.41/MailServiceProvider.php
        $this->app->singleton('mailer', function ($app) {
            $view = $app['view'];
            $view->prependNamespace('flarum-subscriptions', realpath(__DIR__.'/../../resources/views'));
            $view->addNamespace('pretty-mail', realpath(__DIR__.'/../../resources/views'));

            $mailer = new Mailer($view, $app['swift.mailer'], $app['events']);

            if ($app->bound('queue')) {
                $mailer->setQueue($app['queue']);
            }

            $from = $app['config']['mail.from'];
            if (is_array($from) && isset($from['address'])) {
                $mailer->alwaysFrom($from['address'], $from['name']);
            }

            return $mailer;
        });
    }
}
