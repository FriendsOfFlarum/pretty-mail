<?php

namespace Reflar\PrettyMail\Providers;

use Reflar\PrettyMail\Mailer;
use Flarum\Foundation\AbstractServiceProvider;

class MailerProvider extends AbstractServiceProvider
{
    public function boot()
    {
        // Mostly copy-pasted from https://github.com/illuminate/mail/blob/v5.1.41/MailServiceProvider.php
        $this->app->singleton('mailer', function($app) {
            $view = $app['view'];
            $view->addNamespace('pretty-mail', realpath(__DIR__ . '/../../views'));

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
