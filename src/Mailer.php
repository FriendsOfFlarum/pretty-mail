<?php

namespace Reflar\PrettyMail;

use Illuminate\Mail\Mailer as LaravelMailer;
use s9e\TextFormatter\Bundles\Fatdown;

class Mailer extends LaravelMailer
{
    /**
     * Flarum assets directory, to find out where the css is
     * @var string
     */
    protected $assets_dir = (__DIR__ . '/../../../public/assets/');

    public function raw($text, $callback)
    {
        $matches = [];
        preg_match(
            "/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/m",
            $text,
            $matches
        );

        $body = Fatdown::render(Fatdown::parse($text));

        $app = app();
        $settings = $app->make('Flarum\Settings\SettingsRepositoryInterface');

        if ($settings->get('reflar-prettymail.mailhtml') !== file_get_contents(__DIR__ . '/../resources/views/emails/default.blade.php')) {
            file_put_contents(
                __DIR__ . '/../resources/views/emails/default.blade.php',
                $settings->get('reflar-prettymail.mailhtml')
            );
        }

        $file = preg_grep('~^forum-.*\.css$~', scandir($this->assets_dir));

        return $this->send('pretty-mail::emails.default', [
            'body'       => $body,
            'settings'   => $settings,
            'baseUrl'    => $app->url(),
            'forumStyle' => file_get_contents($this->assets_dir . reset($file)),
            'link'       => $matches[0],
        ], $callback);
    }
}
