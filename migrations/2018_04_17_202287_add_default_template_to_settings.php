<?php

use Illuminate\Database\ConnectionInterface;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema, ConnectionInterface $db) {
        $db->table('settings')->insert([
            [
                'key'   => 'reflar-prettymail.mailhtml',
                'value' => file_get_contents(__DIR__.'/../resources/views/emails/default.blade.php'),
            ],
        ]);
    },
];
