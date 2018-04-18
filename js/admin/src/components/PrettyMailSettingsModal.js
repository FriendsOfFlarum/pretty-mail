import app from 'flarum/app';
import Button from "flarum/components/Button";
import SettingsModal from 'flarum/components/SettingsModal';


export default class PrettyMailSettingsModal extends SettingsModal {

    title() {
        return app.translator.trans('reflar-prettymail.admin.modal.title');
    }

    className() {
        return 'Modal--large';
    }

    form() {
        return m('.Form-group', [
            m('label', app.translator.trans('reflar-prettymail.admin.modal.label')),
            Button.component({
                type: 'button',
                className: 'Button Button--primary',
                children: app.translator.trans('reflar-prettymail.admin.modal.reset'),
                onclick: () => {
                    if (confirm(app.translator.trans('reflar-prettymail.admin.modal.confirm'))) {
                        this.setting('reflar-prettymail.mailhtml')(
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
            m('div', {className: 'helpText', style: 'margin-top: 10px'}, app.translator.trans('reflar-prettymail.admin.modal.help')),
            m('textarea.FormControl', {
                rows: '15',
                bidi: this.setting('reflar-prettymail.mailhtml'),
            }),
        ])
    }
}