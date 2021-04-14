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
use Flarum\Notification\NotificationMailer;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\PrettyMail\Mailer;
use FoF\PrettyMail\Overrides;
use Illuminate\Contracts\Container\Container;
use Illuminate\Mail\MailManager;

class MailerProvider extends AbstractServiceProvider
{
    public function boot()
    {
        // Mostly copy-pasted from https://github.com/illuminate/mail/blob/v8.x/MailServiceProvider.php
        $this->app->singleton('mail.manager', function (Container $container) {
            return new MailManager($container);
        });

        $this->app->bind('mailer',function(Container $container) {
            $mailer = $container->make('mail.manager')->mailer();
            $settings = app(SettingsRepositoryInterface::class);
            $mailer->alwaysFrom($settings->get('mail_from'), $settings->get('forum_title'));
            return $mailer;
        });
            

        $this->app->extend(NotificationMailer::class, function (NotificationMailer $mailer) {
            return app(Overrides\NotificationMailer::class);
        });
    }
}
