<?php

/*
 * This file is part of fof/pretty-mail.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\PrettyMail;

use Illuminate\Mail\Mailer as LaravelMailer;
use s9e\TextFormatter\Bundles\Fatdown;

class Mailer extends LaravelMailer
{
    /**
     * Flarum assets directory, to find out where the css is.
     *
     * @var string
     */
    protected $assets_dir = (__DIR__.'/../../../public/assets/');

    public function raw($text, $callback, $use_fatdown = true)
    {
        $matches = [];
        preg_match(
            "/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/m",
            $text,
            $matches
        );

        if ($use_fatdown) {
            $body = Fatdown::render(Fatdown::parse($text));
        } else {
            $body = $text;
        }

        $app = app();
        $settings = $app->make('Flarum\Settings\SettingsRepositoryInterface');

        if ($settings->get('fof-pretty-mail.mailhtml') !== file_get_contents(__DIR__.'/../resources/views/emails/default.blade.php')) {
            file_put_contents(
                __DIR__.'/../resources/views/emails/default.blade.php',
                $settings->get('fof-pretty-mail.mailhtml')
            );
        }

        $includeCSS = $settings->get('fof-pretty-mail.includeCSS') == '1';
        if ($includeCSS) {
            $file = preg_grep('~^forum-.*\.css$~', scandir($this->assets_dir));
        }

        return $this->send('pretty-mail::emails.default', [
            'body'       => $body,
            'settings'   => $settings,
            'baseUrl'    => $app->url(),
            'forumStyle' => $includeCSS ? file_get_contents($this->assets_dir.reset($file)) : '',
            'link'       => empty($matches) ? null : $matches[0],
        ], $callback);
    }
}
