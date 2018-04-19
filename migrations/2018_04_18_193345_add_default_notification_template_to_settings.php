<?php

use Illuminate\Database\ConnectionInterface;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema, ConnectionInterface $db) {
        $db->table('settings')->insert([
            [
                'key'   => 'reflar-prettymail.newPost',
                'value' => file_get_contents(__DIR__.'/../resources/views/emails/newPost.blade.php'),
            ],
            [
                'key'   => 'reflar-prettymail.postMentioned',
                'value' => file_get_contents(__DIR__.'/../resources/views/emails/postMentioned.blade.php'),
            ],
            [
                'key'   => 'reflar-prettymail.userMentioned',
                'value' => file_get_contents(__DIR__.'/../resources/views/emails/userMentioned.blade.php'),
            ],
        ]);
    },
];
