<?php

use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->getConnection()->table('settings')->insert([
            [
                'key'   => 'reflar-prettymail.mailhtml',
                'value' => file_get_contents(__DIR__ . '/../resources/views/emails/default.blade.php'),
            ],
        ]);
    },
];
