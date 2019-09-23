<?php

use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        /**
         * @var SettingsRepositoryInterface
         */
        $settings = app('flarum.settings');

        $keys = ['mailhtml', 'newPost', 'postMentioned', 'userMentioned', 'includeCSS'];

        foreach ($keys as $key) {
            $value = $settings->get($full = "fof-pretty-mail.$key");

            if ($value !== null) {
                $settings->set("fof-pretty-mail.$key", $value);
                $settings->delete($full);
            } else {
                $file = $key;

                if ($file === 'mailhtml') {
                    $file = 'default';
                } elseif ($file === 'includeCSS') {
                    continue;
                }

                $settings->set("fof-pretty-mail.$key", file_get_contents(__DIR__."/../resources/views/emails/$file.blade.php"));
            }
        }
    },
    'down' => function (Builder $schema) {
        //
    },
];
