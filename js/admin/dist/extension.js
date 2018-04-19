"use strict";

System.register("reflar/prettymail/addSettingsPage", ["flarum/extend", "flarum/components/AdminNav", "flarum/components/AdminLinkButton", "./components/settingsPage"], function (_export, _context) {
    "use strict";

    var extend, AdminNav, AdminLinkButton, settingsPage;

    _export("default", function () {
        app.routes['reflar-pretty-mail'] = { path: '/reflar/pretty-mail', component: settingsPage.component() };

        app.extensionSettings['reflar-pretty-mail'] = function () {
            return m.route(app.route('reflar-pretty-mail'));
        };

        extend(AdminNav.prototype, 'items', function (items) {
            items.add('reflar-pretty-mail', AdminLinkButton.component({
                href: app.route('reflar-pretty-mail'),
                icon: 'envelope-open',
                children: 'Pretty Mail',
                description: app.translator.trans('reflar-prettymail.admin.nav.desc')
            }));
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav.default;
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton.default;
        }, function (_componentsSettingsPage) {
            settingsPage = _componentsSettingsPage.default;
        }],
        execute: function () {}
    };
});;
"use strict";

System.register("reflar/prettymail/components/settingsPage", ["flarum/components/Alert", "flarum/components/Button", "flarum/components/Page", "flarum/utils/saveSettings"], function (_export, _context) {
    "use strict";

    var Alert, Button, Page, saveSettings, settingsPage;
    return {
        setters: [function (_flarumComponentsAlert) {
            Alert = _flarumComponentsAlert.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumComponentsPage) {
            Page = _flarumComponentsPage.default;
        }, function (_flarumUtilsSaveSettings) {
            saveSettings = _flarumUtilsSaveSettings.default;
        }],
        execute: function () {
            settingsPage = function (_Page) {
                babelHelpers.inherits(settingsPage, _Page);

                function settingsPage() {
                    babelHelpers.classCallCheck(this, settingsPage);
                    return babelHelpers.possibleConstructorReturn(this, (settingsPage.__proto__ || Object.getPrototypeOf(settingsPage)).apply(this, arguments));
                }

                babelHelpers.createClass(settingsPage, [{
                    key: "init",
                    value: function init() {
                        var _this2 = this;

                        this.fields = ['mailhtml', 'newPost', 'postMentioned', 'userMentioned'];

                        this.values = {};

                        this.settingsPrefix = 'reflar-prettymail';

                        var settings = app.data.settings;

                        this.fields.forEach(function (key) {
                            return _this2.values[key] = m.prop(settings[_this2.addPrefix(key)]);
                        });
                    }
                }, {
                    key: "view",
                    value: function view() {
                        var _this3 = this;

                        return [m('div', { style: 'padding-bottom: 20px', className: 'SettingsPage' }, [m('div', { className: 'container' }, [m('Form-group', [m('Form', { onsubmit: this.onsubmit.bind(this) }, [m('h1', app.translator.trans('reflar-prettymail.admin.settings.label')), m('div', {
                            className: 'helpText',
                            style: 'margin: 10px 0 10px'
                        }, app.translator.trans('reflar-prettymail.admin.settings.help', { strong: m("strong", null) })), m('label', app.translator.trans('reflar-prettymail.admin.settings.default')), m('br'), Button.component({
                            type: 'button',
                            style: 'margin-bottom: 10px',
                            className: 'Button Button--primary',
                            children: app.translator.trans('reflar-prettymail.admin.settings.reset'),
                            onclick: function onclick() {
                                if (confirm(app.translator.trans('reflar-prettymail.admin.settings.confirm') + ' default?')) {
                                    _this3.values.mailhtml("<html>\n" + "    <head>\n" + "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" + "        <style type=\"text/css\">\n" + "            body {\n" + "                font-family: 'Open Sans', sans-serif;\n" + "                background: white;\n" + "                color: #426799;\n" + "                margin: 0;\n" + "                padding: 0;\n" + "            }\n" + "            .content {\n" + "                box-sizing: border-box;\n" + "                width: 100%;\n" + "                max-width: 500px;\n" + "                margin: 0 auto;\n" + "                padding: 10px 20px;\n" + "            }\n" + "            .header {\n" + "                border-bottom: 1px solid #e8ecf3;\n" + "             }\n" + "             .header a {\n" + "                color: {{ $settings->get('theme_primary_color') }};\n" + "                text-decoration: none;\n" + "             }\n" + "             .footer {\n" + "                background: #e8ecf3;\n" + "             }\n" + "        </style>\n" + "    </head>\n" + "</html>\n" + "<body>\n" + "    <div class=\"header\">\n" + "        <div class=\"content\">\n" + "            <a href=\"{{ $baseUrl }}\">{{ $settings->get('forum_title') }}</a>\n" + "        </div>\n" + "    </div>\n" + "    <div class=\"content\">\n" + "        {!! $body !!}\n" + "    </div>\n" + "    <div class=\"footer\">\n" + "        <div class=\"content\">\n" + "            <p>Sent from {{ $settings->get('forum_title') }} using the Pretty Mail extension</p>\n" + "        </div>\n" + "    </div>\n" + "</body>");
                                }
                            }
                        }), m('textarea.FormControl', {
                            rows: '15',
                            value: this.values.mailhtml(),
                            style: 'margin: 10px 0 10px',
                            oninput: m.withAttr('value', this.values.mailhtml)
                        }), m('h3', app.translator.trans('reflar-prettymail.admin.settings.notifications')), m('div', {
                            className: 'helpText',
                            style: 'margin-top: 10px'
                        }, app.translator.trans('reflar-prettymail.admin.settings.notificationHelp')), m('label', app.translator.trans('reflar-prettymail.admin.settings.newPost')), m('br'), Button.component({
                            type: 'button',
                            style: 'margin: 10px 0 10px',
                            className: 'Button Button--primary',
                            children: app.translator.trans('reflar-prettymail.admin.settings.reset'),
                            onclick: function onclick() {
                                if (confirm(app.translator.trans('reflar-prettymail.admin.settings.confirm') + ' newPost?')) {
                                    _this3.values.newPost("<html>\n" + "    <head>\n" + "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" + "        <style type=\"text/css\">\n" + "            body {\n" + "                font-family: 'Open Sans', sans-serif;\n" + "                background: white;\n" + "                color: #426799;\n" + "                margin: 0;\n" + "                padding: 0;\n" + "            }\n" + "            .content {\n" + "                box-sizing: border-box;\n" + "                width: 100%;\n" + "                max-width: 500px;\n" + "                margin: 0 auto;\n" + "                padding: 10px 20px;\n" + "            }\n" + "            .header {\n" + "                border-bottom: 1px solid #e8ecf3;\n" + "            }\n" + "            .header a {\n" + "                color: {{ $settings->get('theme_primary_color') }};\n" + "                text-decoration: none;\n" + "            }\n" + "            .footer {\n" + "                background: #e8ecf3;\n" + "            }\n" + "        </style>\n" + "        <style>\n" + "            {!! $forumStyle !!}\n" + "        </style>\n" + "    </head>\n" + "</html>\n" + "<body>\n" + "    <div class=\"header\">\n" + "        <div class=\"content\">\n" + "            <a href=\"{{ $baseUrl }}\">{{ $settings->get('forum_title') }}</a>\n" + "        </div>\n" + "    </div>\n" + "    <div class=\"content\">\n" + "        <div class=\"info\">\n" + "            <p>Hey {!! $user->display_name !!}!</p>\n" + "\n" + "            <p>{!! $blueprint->post->user->display_name !!} made a post in a discussion you're following: {!! $blueprint->post->discussion->title !!}</p>\n" + "\n" + "            <p>To view the new activity, check out the following link:</p>\n" + "            <p>{!! $baseUrl !!}/d/{!! $blueprint->post->discussion_id !!}/{!! $blueprint->post->number !!}</p>\n" + "\n" + "            ---\n" + "\n" + "        </div>\n" + "        <br/>\n" + "        <div class=\"post-content\">\n" + "            {!! $blueprint->post->contentHtml !!}\n" + "        </div>\n" + "        <br/>\n" + "        <div class=\"info\">\n" + "            ---\n" + "\n" + "            <p>You won't receive any more notifications about this discussion until you're up-to-date.</p>\n" + "        </div>\n" + "    </div>\n" + "    <div class=\"footer\">\n" + "        <div class=\"content\">\n" + "            <p>Sent from {{ $settings->get('forum_title') }} using the Pretty Mail extension</p>\n" + "        </div>\n" + "    </div>\n" + "</body>\n");
                                }
                            }
                        }), m('textarea.FormControl', {
                            rows: '15',
                            value: this.values.newPost(),
                            style: 'margin-bottom: 10px',
                            oninput: m.withAttr('value', this.values.newPost)
                        }), m('label', app.translator.trans('reflar-prettymail.admin.settings.userMentioned')), m('br'), Button.component({
                            type: 'button',
                            style: 'margin: 10px 0 10px',
                            className: 'Button Button--primary',
                            children: app.translator.trans('reflar-prettymail.admin.settings.reset'),
                            onclick: function onclick() {
                                if (confirm(app.translator.trans('reflar-prettymail.admin.settings.confirm') + ' userMentioned?')) {
                                    _this3.values.userMentioned("<html>\n" + "    <head>\n" + "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" + "        <style type=\"text/css\">\n" + "            body {\n" + "                font-family: 'Open Sans', sans-serif;\n" + "                background: white;\n" + "                color: #426799;\n" + "                margin: 0;\n" + "                padding: 0;\n" + "            }\n" + "            .content {\n" + "                box-sizing: border-box;\n" + "                width: 100%;\n" + "                max-width: 500px;\n" + "                margin: 0 auto;\n" + "                padding: 10px 20px;\n" + "            }\n" + "            .header {\n" + "                border-bottom: 1px solid #e8ecf3;\n" + "            }\n" + "            .header a {\n" + "                color: {{ $settings->get('theme_primary_color') }};\n" + "                text-decoration: none;\n" + "            }\n" + "            .footer {\n" + "                background: #e8ecf3;\n" + "            }\n" + "        </style>\n" + "        <style>\n" + "            {!! $forumStyle !!}\n" + "        </style>\n" + "    </head>\n" + "</html>\n" + "<body>\n" + "    <div class=\"header\">\n" + "        <div class=\"content\">\n" + "            <a href=\"{{ $baseUrl }}\">{{ $settings->get('forum_title') }}</a>\n" + "        </div>\n" + "    </div>\n" + "    <div class=\"content\">\n" + "        <div class=\"info\">\n" + "            <p>Hey {!! $user->display_name !!}!</p>\n" + "\n" + "            <p>{!! $blueprint->post->user->username !!} mentioned you in a post in {!! $blueprint->post->discussion->title !!}.</p>\n" + "\n" + "            <p>{!! $baseUrl !!}/d/{!! $blueprint->post->discussion_id !!}/{!! $blueprint->post->number !!}</p>\n" + "\n" + "            ---\n" + "\n" + "        </div>\n" + "        <br/>\n" + "        <div class=\"post-content\">\n" + "            {!! $blueprint->post->contentHtml !!}\n" + "        </div>\n" + "        <br/>\n" + "    </div>\n" + "    <div class=\"footer\">\n" + "        <div class=\"content\">\n" + "            <p>Sent from {{ $settings->get('forum_title') }} using the Pretty Mail extension</p>\n" + "        </div>\n" + "    </div>\n" + "</body>\n");
                                }
                            }
                        }), m('textarea.FormControl', {
                            rows: '15',
                            value: this.values.userMentioned(),
                            style: 'margin-bottom: 10px',
                            oninput: m.withAttr('value', this.values.userMentioned)
                        }), m('label', app.translator.trans('reflar-prettymail.admin.settings.postMentioned')), m('br'), Button.component({
                            type: 'button',
                            style: 'margin: 10px 0 10px',
                            className: 'Button Button--primary',
                            children: app.translator.trans('reflar-prettymail.admin.settings.reset'),
                            onclick: function onclick() {
                                if (confirm(app.translator.trans('reflar-prettymail.admin.settings.confirm') + ' postMentioned?')) {
                                    _this3.values.postMentioned("<html>\n" + "    <head>\n" + "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" + "        <style type=\"text/css\">\n" + "            body {\n" + "                font-family: 'Open Sans', sans-serif;\n" + "                background: white;\n" + "                color: #426799;\n" + "                margin: 0;\n" + "                padding: 0;\n" + "            }\n" + "            .content {\n" + "                box-sizing: border-box;\n" + "                width: 100%;\n" + "                max-width: 500px;\n" + "                margin: 0 auto;\n" + "                padding: 10px 20px;\n" + "            }\n" + "            .header {\n" + "                border-bottom: 1px solid #e8ecf3;\n" + "            }\n" + "            .header a {\n" + "                color: {{ $settings->get('theme_primary_color') }};\n" + "                text-decoration: none;\n" + "            }\n" + "            .footer {\n" + "                background: #e8ecf3;\n" + "            }\n" + "        </style>\n" + "        <style>\n" + "            {!! $forumStyle !!}\n" + "        </style>\n" + "    </head>\n" + "</html>\n" + "<body>\n" + "    <div class=\"header\">\n" + "        <div class=\"content\">\n" + "            <a href=\"{{ $baseUrl }}\">{{ $settings->get('forum_title') }}</a>\n" + "        </div>\n" + "    </div>\n" + "    <div class=\"content\">\n" + "        <div class=\"info\">\n" + "            <p>Hey {!! $user->display_name !!}!</p>\n" + "\n" + "            <p>{!! $blueprint->reply->user->username !!} replied to your post (#{!! $blueprint->post->number !!}) in {!! $blueprint->post->discussion->title !!}.</p>\n" + "\n" + "            <p>{!! app()->url() !!}/d/{!! $blueprint->reply->discussion_id !!}/{!! $blueprint->reply->number !!}</p>\n" + "\n" + "            ---\n" + "\n" + "        </div>\n" + "        <br/>\n" + "        <div class=\"post-content\">\n" + "            {!! $blueprint->reply->contentHtml !!}\n" + "        </div>\n" + "        <br/>\n" + "    </div>\n" + "    <div class=\"footer\">\n" + "        <div class=\"content\">\n" + "            <p>Sent from {{ $settings->get('forum_title') }} using the Pretty Mail extension</p>\n" + "        </div>\n" + "    </div>\n" + "</body>\n");
                                }
                            }
                        }), m('textarea.FormControl', {
                            rows: '15',
                            value: this.values.postMentioned(),
                            style: 'margin-bottom: 10px',
                            oninput: m.withAttr('value', this.values.postMentioned)
                        }), Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: app.translator.trans('core.admin.settings.submit_button'),
                            loading: this.loading,
                            disabled: !this.changed()
                        })])])])])];
                    }
                }, {
                    key: "changed",
                    value: function changed() {
                        var _this4 = this;

                        var fieldsCheck = this.fields.some(function (key) {
                            return _this4.values[key]() !== app.data.settings[_this4.addPrefix(key)];
                        });
                        return fieldsCheck;
                    }
                }, {
                    key: "onsubmit",
                    value: function onsubmit(e) {
                        var _this5 = this;

                        e.preventDefault();

                        if (this.loading) return;

                        this.loading = true;

                        app.alerts.dismiss(this.successAlert);

                        var settings = {};

                        this.fields.forEach(function (key) {
                            return settings[_this5.addPrefix(key)] = _this5.values[key]();
                        });

                        saveSettings(settings).then(function () {
                            _this5.loading = false;
                            app.alerts.show(_this5.successAlert = new Alert({
                                type: 'success',
                                children: app.translator.trans('core.admin.basics.saved_message')
                            }));
                        });
                    }
                }, {
                    key: "addPrefix",
                    value: function addPrefix(key) {
                        return this.settingsPrefix + '.' + key;
                    }
                }]);
                return settingsPage;
            }(Page);

            _export("default", settingsPage);
        }
    };
});;
'use strict';

System.register('reflar/prettymail/main', ['flarum/extend', 'flarum/app', './addSettingsPage'], function (_export, _context) {
    "use strict";

    var extend, app, addSettingsPage;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_addSettingsPage) {
            addSettingsPage = _addSettingsPage.default;
        }],
        execute: function () {

            app.initializers.add('reflar-pretty-mail', function (app) {
                addSettingsPage();
            });
        }
    };
});