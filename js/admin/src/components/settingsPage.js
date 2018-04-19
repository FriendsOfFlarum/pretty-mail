import Alert from "flarum/components/Alert";
import Button from "flarum/components/Button";
import Page from 'flarum/components/Page';
import saveSettings from "flarum/utils/saveSettings";

export default class settingsPage extends Page {

    init() {

        this.fields = [
            'mailhtml',
            'newPost',
            'postMentioned',
            'userMentioned'
        ];

        this.values = {};

        this.settingsPrefix = 'reflar-prettymail';

        const settings = app.data.settings;

        this.fields.forEach(key =>
            this.values[key] = m.prop(settings[this.addPrefix(key)])
        );
    }

    view() {
        return [
            m('div', {style: 'padding-bottom: 20px', className: 'SettingsPage'}, [
                m('div', {className: 'container'}, [
                    m('Form-group', [
                        m('Form', {onsubmit: this.onsubmit.bind(this)}, [
                            m('h1', app.translator.trans('reflar-prettymail.admin.settings.label')),
                            m('div', {
                                className: 'helpText',
                                style: 'margin: 10px 0 10px'
                            }, app.translator.trans('reflar-prettymail.admin.settings.help', {strong: <strong/>})),
                            m('label', app.translator.trans('reflar-prettymail.admin.settings.default')),
                            m('br'),
                            Button.component({
                                type: 'button',
                                style: 'margin-bottom: 10px',
                                className: 'Button Button--primary',
                                children: app.translator.trans('reflar-prettymail.admin.settings.reset'),
                                onclick: () => {
                                    if (confirm(app.translator.trans('reflar-prettymail.admin.settings.confirm') + ' default?')) {
                                        this.values.mailhtml(
                                            "<html>\n" +
                                            "    <head>\n" +
                                            "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" +
                                            "        <style type=\"text/css\">\n" +
                                            "            body {\n" +
                                            "                font-family: 'Open Sans', sans-serif;\n" +
                                            "                background: white;\n" +
                                            "                color: #426799;\n" +
                                            "                margin: 0;\n" +
                                            "                padding: 0;\n" +
                                            "            }\n" +
                                            "            .content {\n" +
                                            "                box-sizing: border-box;\n" +
                                            "                width: 100%;\n" +
                                            "                max-width: 500px;\n" +
                                            "                margin: 0 auto;\n" +
                                            "                padding: 10px 20px;\n" +
                                            "            }\n" +
                                            "            .header {\n" +
                                            "                border-bottom: 1px solid #e8ecf3;\n" +
                                            "             }\n" +
                                            "             .header a {\n" +
                                            "                color: {{ $settings->get('theme_primary_color') }};\n" +
                                            "                text-decoration: none;\n" +
                                            "             }\n" +
                                            "             .footer {\n" +
                                            "                background: #e8ecf3;\n" +
                                            "             }\n" +
                                            "        </style>\n" +
                                            "    </head>\n" +
                                            "</html>\n" +
                                            "<body>\n" +
                                            "    <div class=\"header\">\n" +
                                            "        <div class=\"content\">\n" +
                                            "            <a href=\"{{ $baseUrl }}\">{{ $settings->get('forum_title') }}</a>\n" +
                                            "        </div>\n" +
                                            "    </div>\n" +
                                            "    <div class=\"content\">\n" +
                                            "        {!! $body !!}\n" +
                                            "    </div>\n" +
                                            "    <div class=\"footer\">\n" +
                                            "        <div class=\"content\">\n" +
                                            "            <p>Sent from {{ $settings->get('forum_title') }} using the Pretty Mail extension</p>\n" +
                                            "        </div>\n" +
                                            "    </div>\n" +
                                            "</body>"
                                        )
                                    }
                                }
                            }),
                            m('textarea.FormControl', {
                                rows: '15',
                                value: this.values.mailhtml(),
                                style: 'margin: 10px 0 10px',
                                oninput: m.withAttr('value', this.values.mailhtml)
                            }),
                            m('h3', app.translator.trans('reflar-prettymail.admin.settings.notifications')),
                            m('div', {
                                className: 'helpText',
                                style: 'margin-top: 10px'
                            }, app.translator.trans('reflar-prettymail.admin.settings.notificationHelp')),
                            m('label', app.translator.trans('reflar-prettymail.admin.settings.newPost')),
                            m('br'),
                            Button.component({
                                type: 'button',
                                style: 'margin: 10px 0 10px',
                                className: 'Button Button--primary',
                                children: app.translator.trans('reflar-prettymail.admin.settings.reset'),
                                onclick: () => {
                                    if (confirm(app.translator.trans('reflar-prettymail.admin.settings.confirm') + ' newPost?')) {
                                        this.values.newPost(
                                            "<html>\n" +
                                            "    <head>\n" +
                                            "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" +
                                            "        <style type=\"text/css\">\n" +
                                            "            body {\n" +
                                            "                font-family: 'Open Sans', sans-serif;\n" +
                                            "                background: white;\n" +
                                            "                color: #426799;\n" +
                                            "                margin: 0;\n" +
                                            "                padding: 0;\n" +
                                            "            }\n" +
                                            "            .content {\n" +
                                            "                box-sizing: border-box;\n" +
                                            "                width: 100%;\n" +
                                            "                max-width: 500px;\n" +
                                            "                margin: 0 auto;\n" +
                                            "                padding: 10px 20px;\n" +
                                            "            }\n" +
                                            "            .header {\n" +
                                            "                border-bottom: 1px solid #e8ecf3;\n" +
                                            "            }\n" +
                                            "            .header a {\n" +
                                            "                color: {{ $settings->get('theme_primary_color') }};\n" +
                                            "                text-decoration: none;\n" +
                                            "            }\n" +
                                            "            .footer {\n" +
                                            "                background: #e8ecf3;\n" +
                                            "            }\n" +
                                            "        </style>\n" +
                                            "        <style>\n" +
                                            "            {!! $forumStyle !!}\n" +
                                            "        </style>\n" +
                                            "    </head>\n" +
                                            "</html>\n" +
                                            "<body>\n" +
                                            "    <div class=\"header\">\n" +
                                            "        <div class=\"content\">\n" +
                                            "            <a href=\"{{ $baseUrl }}\">{{ $settings->get('forum_title') }}</a>\n" +
                                            "        </div>\n" +
                                            "    </div>\n" +
                                            "    <div class=\"content\">\n" +
                                            "        <div class=\"info\">\n" +
                                            "            <p>Hey {!! $user->display_name !!}!</p>\n" +
                                            "\n" +
                                            "            <p>{!! $blueprint->post->user->display_name !!} made a post in a discussion you're following: {!! $blueprint->post->discussion->title !!}</p>\n" +
                                            "\n" +
                                            "            <p>To view the new activity, check out the following link:</p>\n" +
                                            "            <p>{!! $baseUrl !!}/d/{!! $blueprint->post->discussion_id !!}/{!! $blueprint->post->number !!}</p>\n" +
                                            "\n" +
                                            "            ---\n" +
                                            "\n" +
                                            "        </div>\n" +
                                            "        <br/>\n" +
                                            "        <div class=\"post-content\">\n" +
                                            "            {!! $blueprint->post->contentHtml !!}\n" +
                                            "        </div>\n" +
                                            "        <br/>\n" +
                                            "        <div class=\"info\">\n" +
                                            "            ---\n" +
                                            "\n" +
                                            "            <p>You won't receive any more notifications about this discussion until you're up-to-date.</p>\n" +
                                            "        </div>\n" +
                                            "    </div>\n" +
                                            "    <div class=\"footer\">\n" +
                                            "        <div class=\"content\">\n" +
                                            "            <p>Sent from {{ $settings->get('forum_title') }} using the Pretty Mail extension</p>\n" +
                                            "        </div>\n" +
                                            "    </div>\n" +
                                            "</body>\n"
                                        )
                                    }
                                }
                            }),
                            m('textarea.FormControl', {
                                rows: '15',
                                value: this.values.newPost(),
                                style: 'margin-bottom: 10px',
                                oninput: m.withAttr('value', this.values.newPost)
                            }),
                            m('label', app.translator.trans('reflar-prettymail.admin.settings.userMentioned')),
                            m('br'),
                            Button.component({
                                type: 'button',
                                style: 'margin: 10px 0 10px',
                                className: 'Button Button--primary',
                                children: app.translator.trans('reflar-prettymail.admin.settings.reset'),
                                onclick: () => {
                                    if (confirm(app.translator.trans('reflar-prettymail.admin.settings.confirm') + ' userMentioned?')) {
                                        this.values.userMentioned(
                                            "<html>\n" +
                                            "    <head>\n" +
                                            "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" +
                                            "        <style type=\"text/css\">\n" +
                                            "            body {\n" +
                                            "                font-family: 'Open Sans', sans-serif;\n" +
                                            "                background: white;\n" +
                                            "                color: #426799;\n" +
                                            "                margin: 0;\n" +
                                            "                padding: 0;\n" +
                                            "            }\n" +
                                            "            .content {\n" +
                                            "                box-sizing: border-box;\n" +
                                            "                width: 100%;\n" +
                                            "                max-width: 500px;\n" +
                                            "                margin: 0 auto;\n" +
                                            "                padding: 10px 20px;\n" +
                                            "            }\n" +
                                            "            .header {\n" +
                                            "                border-bottom: 1px solid #e8ecf3;\n" +
                                            "            }\n" +
                                            "            .header a {\n" +
                                            "                color: {{ $settings->get('theme_primary_color') }};\n" +
                                            "                text-decoration: none;\n" +
                                            "            }\n" +
                                            "            .footer {\n" +
                                            "                background: #e8ecf3;\n" +
                                            "            }\n" +
                                            "        </style>\n" +
                                            "        <style>\n" +
                                            "            {!! $forumStyle !!}\n" +
                                            "        </style>\n" +
                                            "    </head>\n" +
                                            "</html>\n" +
                                            "<body>\n" +
                                            "    <div class=\"header\">\n" +
                                            "        <div class=\"content\">\n" +
                                            "            <a href=\"{{ $baseUrl }}\">{{ $settings->get('forum_title') }}</a>\n" +
                                            "        </div>\n" +
                                            "    </div>\n" +
                                            "    <div class=\"content\">\n" +
                                            "        <div class=\"info\">\n" +
                                            "            <p>Hey {!! $user->display_name !!}!</p>\n" +
                                            "\n" +
                                            "            <p>{!! $blueprint->post->user->username !!} mentioned you in a post in {!! $blueprint->post->discussion->title !!}.</p>\n" +
                                            "\n" +
                                            "            <p>{!! $baseUrl !!}/d/{!! $blueprint->post->discussion_id !!}/{!! $blueprint->post->number !!}</p>\n" +
                                            "\n" +
                                            "            ---\n" +
                                            "\n" +
                                            "        </div>\n" +
                                            "        <br/>\n" +
                                            "        <div class=\"post-content\">\n" +
                                            "            {!! $blueprint->post->contentHtml !!}\n" +
                                            "        </div>\n" +
                                            "        <br/>\n" +
                                            "    </div>\n" +
                                            "    <div class=\"footer\">\n" +
                                            "        <div class=\"content\">\n" +
                                            "            <p>Sent from {{ $settings->get('forum_title') }} using the Pretty Mail extension</p>\n" +
                                            "        </div>\n" +
                                            "    </div>\n" +
                                            "</body>\n"
                                        )
                                    }
                                }
                            }),
                            m('textarea.FormControl', {
                                rows: '15',
                                value: this.values.userMentioned(),
                                style: 'margin-bottom: 10px',
                                oninput: m.withAttr('value', this.values.userMentioned)
                            }),
                            m('label', app.translator.trans('reflar-prettymail.admin.settings.postMentioned')),
                            m('br'),
                            Button.component({
                                type: 'button',
                                style: 'margin: 10px 0 10px',
                                className: 'Button Button--primary',
                                children: app.translator.trans('reflar-prettymail.admin.settings.reset'),
                                onclick: () => {
                                    if (confirm(app.translator.trans('reflar-prettymail.admin.settings.confirm') + ' postMentioned?')) {
                                        this.values.postMentioned(
                                            "<html>\n" +
                                            "    <head>\n" +
                                            "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" +
                                            "        <style type=\"text/css\">\n" +
                                            "            body {\n" +
                                            "                font-family: 'Open Sans', sans-serif;\n" +
                                            "                background: white;\n" +
                                            "                color: #426799;\n" +
                                            "                margin: 0;\n" +
                                            "                padding: 0;\n" +
                                            "            }\n" +
                                            "            .content {\n" +
                                            "                box-sizing: border-box;\n" +
                                            "                width: 100%;\n" +
                                            "                max-width: 500px;\n" +
                                            "                margin: 0 auto;\n" +
                                            "                padding: 10px 20px;\n" +
                                            "            }\n" +
                                            "            .header {\n" +
                                            "                border-bottom: 1px solid #e8ecf3;\n" +
                                            "            }\n" +
                                            "            .header a {\n" +
                                            "                color: {{ $settings->get('theme_primary_color') }};\n" +
                                            "                text-decoration: none;\n" +
                                            "            }\n" +
                                            "            .footer {\n" +
                                            "                background: #e8ecf3;\n" +
                                            "            }\n" +
                                            "        </style>\n" +
                                            "        <style>\n" +
                                            "            {!! $forumStyle !!}\n" +
                                            "        </style>\n" +
                                            "    </head>\n" +
                                            "</html>\n" +
                                            "<body>\n" +
                                            "    <div class=\"header\">\n" +
                                            "        <div class=\"content\">\n" +
                                            "            <a href=\"{{ $baseUrl }}\">{{ $settings->get('forum_title') }}</a>\n" +
                                            "        </div>\n" +
                                            "    </div>\n" +
                                            "    <div class=\"content\">\n" +
                                            "        <div class=\"info\">\n" +
                                            "            <p>Hey {!! $user->display_name !!}!</p>\n" +
                                            "\n" +
                                            "            <p>{!! $blueprint->reply->user->username !!} replied to your post (#{!! $blueprint->post->number !!}) in {!! $blueprint->post->discussion->title !!}.</p>\n" +
                                            "\n" +
                                            "            <p>{!! app()->url() !!}/d/{!! $blueprint->reply->discussion_id !!}/{!! $blueprint->reply->number !!}</p>\n" +
                                            "\n" +
                                            "            ---\n" +
                                            "\n" +
                                            "        </div>\n" +
                                            "        <br/>\n" +
                                            "        <div class=\"post-content\">\n" +
                                            "            {!! $blueprint->reply->contentHtml !!}\n" +
                                            "        </div>\n" +
                                            "        <br/>\n" +
                                            "    </div>\n" +
                                            "    <div class=\"footer\">\n" +
                                            "        <div class=\"content\">\n" +
                                            "            <p>Sent from {{ $settings->get('forum_title') }} using the Pretty Mail extension</p>\n" +
                                            "        </div>\n" +
                                            "    </div>\n" +
                                            "</body>\n"
                                        )
                                    }
                                }
                            }),
                            m('textarea.FormControl', {
                                rows: '15',
                                value: this.values.postMentioned(),
                                style: 'margin-bottom: 10px',
                                oninput: m.withAttr('value', this.values.postMentioned)
                            }),
                            Button.component({
                                type: 'submit',
                                className: 'Button Button--primary',
                                children: app.translator.trans('core.admin.settings.submit_button'),
                                loading: this.loading,
                                disabled: !this.changed()
                            })
                        ])
                    ])
                ])
            ])
        ]
    }

    /**
     * @returns {boolean}
     */
    changed() {
        var fieldsCheck = this.fields.some(key => this.values[key]() !== app.data.settings[this.addPrefix(key)]);
        return fieldsCheck;
    }

    /**
     * @param e
     */
    onsubmit(e) {
        e.preventDefault();

        if (this.loading) return;

        this.loading = true;

        app.alerts.dismiss(this.successAlert);

        const settings = {};

        this.fields.forEach(key => settings[this.addPrefix(key)] = this.values[key]());

        saveSettings(settings)
            .then(() => {
                this.loading = false;
                app.alerts.show(this.successAlert = new Alert({
                    type: 'success',
                    children: app.translator.trans('core.admin.basics.saved_message')
                }));
            })
    }

    /**
     * @returns string
     */
    addPrefix(key) {
        return this.settingsPrefix + '.' + key;
    }
}