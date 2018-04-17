<?php

namespace Reflar\PrettyMail;

use Illuminate\Mail\Mailer as LaravelMailer;
use s9e\TextFormatter\Bundles\Fatdown;

class Mailer extends LaravelMailer
{
    public function raw($text, $callback)
    {

        $matches = [];
        preg_match("/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/m", $text, $matches);

        $body = Fatdown::render(Fatdown::parse($text));

        $app = app();
        $settings = $app->make('Flarum\Settings\SettingsRepositoryInterface');


        return $this->send('pretty-mail::mail', [
            'body' => $body,
            'settings' => $settings,
            'baseUrl' => $app->url(),
            'link' => $matches[0]
        ], $callback);
    }
}
