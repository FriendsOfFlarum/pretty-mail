<?php

namespace Reflar\PrettyMail\Providers;

use Flarum\Foundation\AbstractServiceProvider;
use Reflar\PrettyMail\Mailer;

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

            $mailer->setContainer($app);
            if ($app->bound('Psr\Log\LoggerInterface')) {
                $mailer->setLogger($app->make('Psr\Log\LoggerInterface'));
            }
            if ($app->bound('queue')) {
                $mailer->setQueue($app['queue.connection']);
            }

            $from = $app['config']['mail.from'];
            if (is_array($from) && isset($from['address'])) {
                $mailer->alwaysFrom($from['address'], $from['name']);
            }

            return $mailer;
        });
    }
}
