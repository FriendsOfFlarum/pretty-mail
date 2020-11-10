<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <style type="text/css">
            body {
                font-family: 'Open Sans', sans-serif;
                background: white;
                color: #426799;
                margin: 0;
                padding: 0;
            }
            .content {
                box-sizing: border-box;
                width: 100%;
                max-width: 500px;
                margin: 0 auto;
                padding: 10px 20px;
            }
            .header {
                border-bottom: 1px solid #e8ecf3;
            }
            .header a {
                color: {{ $settings->get('theme_primary_color') }};
                text-decoration: none;
            }
            .footer {
                background: #e8ecf3;
            }
        </style>
        <style>
            {!! $forumStyle !!}
        </style>
    </head>
</html>
<body>
    <div class="header">
        <div class="content">
            <a href="{{ $url->to('forum')->base() }}">{{ $settings->get('forum_title') }}</a>
        </div>
    </div>
    <div class="content">
        <div class="info">
            <p>Hey {!! $user->display_name !!}!</p>

            <p>{!! $blueprint->reply->user->username !!} replied to your post (#{!! $blueprint->post->number !!}) in {!! $blueprint->post->discussion->title !!}.</p>

            <p>{!! $url->to('forum')->route('discussion', ['id' => $blueprint->reply->discussion_id, 'near' => $blueprint->reply->number]) !!}</p>

            ---

        </div>
        <br/>
        <div class="post-content">
            {!! $blueprint->reply->formatContent() !!}
        </div>
        <br/>
    </div>
    <div class="footer">
        <div class="content">
            <p>Sent from {{ $settings->get('forum_title') }} using the Pretty Mail extension</p>
        </div>
    </div>
</body>