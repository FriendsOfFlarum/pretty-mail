import Button from 'flarum/components/Button';
import Page from 'flarum/components/Page';
import saveSettings from 'flarum/utils/saveSettings';
import Switch from 'flarum/components/Switch';
import withAttr from 'flarum/utils/withAttr';
import Stream from 'flarum/utils/Stream';

import * as defaults from '../defaults';

export default class SettingsPage extends Page {
    oninit(vnode) {
        super.oninit(vnode);
        this.fields = ['mailhtml', 'newPost', 'postMentioned', 'userMentioned', 'includeCSS'];

        this.values = {};

        this.settingsPrefix = 'fof-pretty-mail';

        const settings = app.data.settings;

        this.fields.forEach(key => (this.values[key] = Stream(settings[this.addPrefix(key)])));
    }

    view() {
        return [
            m('div', { style: 'padding-bottom: 20px', className: 'SettingsPage' }, [
                m('div', { className: 'container' }, [
                    m('Form-group', [
                        m('Form', { onsubmit: this.onsubmit.bind(this) }, [
                            m('h1', app.translator.trans('fof-pretty-mail.admin.settings.label')),
                            m(
                                'div',
                                {
                                    className: 'helpText',
                                    style: 'margin: 10px 0 10px',
                                },
                                app.translator.trans('fof-pretty-mail.admin.settings.help', { strong: <strong /> })
                            ),
                            m('label', app.translator.trans('fof-pretty-mail.admin.settings.default')),
                            m('br'),
                            Button.component(
                                {
                                    type: 'button',
                                    style: 'margin-bottom: 10px',
                                    className: 'Button Button--primary',
                                    onclick: () => {
                                        if (confirm(app.translator.trans('fof-pretty-mail.admin.settings.confirm') + ' default?')) {
                                            this.values.mailhtml(defaults.mailto);
                                        }
                                    },
                                },
                                app.translator.trans('fof-pretty-mail.admin.settings.reset')
                            ),
                            m('textarea.FormControl', {
                                rows: '15',
                                value: this.values.mailhtml(),
                                style: 'margin: 10px 0 10px',
                                oninput: withAttr('value', this.values.mailhtml),
                            }),
                            m('h3', app.translator.trans('fof-pretty-mail.admin.settings.notifications')),
                            m(
                                'div',
                                {
                                    className: 'helpText',
                                    style: 'margin-top: 10px',
                                },
                                app.translator.trans('fof-pretty-mail.admin.settings.notificationHelp')
                            ),
                            m('label', app.translator.trans('fof-pretty-mail.admin.settings.newPost')),
                            m('br'),
                            Button.component(
                                {
                                    type: 'button',
                                    style: 'margin: 10px 0 10px',
                                    className: 'Button Button--primary',
                                    onclick: () => {
                                        if (confirm(app.translator.trans('fof-pretty-mail.admin.settings.confirm') + ' newPost?')) {
                                            this.values.newPost(defaults.newPost);
                                        }
                                    },
                                },
                                app.translator.trans('fof-pretty-mail.admin.settings.reset')
                            ),
                            m('textarea.FormControl', {
                                rows: '15',
                                value: this.values.newPost(),
                                style: 'margin-bottom: 10px',
                                oninput: withAttr('value', this.values.newPost),
                            }),
                            m('label', app.translator.trans('fof-pretty-mail.admin.settings.userMentioned')),
                            m('br'),
                            Button.component(
                                {
                                    type: 'button',
                                    style: 'margin: 10px 0 10px',
                                    className: 'Button Button--primary',
                                    onclick: () => {
                                        if (confirm(app.translator.trans('fof-pretty-mail.admin.settings.confirm') + ' userMentioned?')) {
                                            this.values.userMentioned(defaults.userMentioned);
                                        }
                                    },
                                },
                                app.translator.trans('fof-pretty-mail.admin.settings.reset')
                            ),
                            m('textarea.FormControl', {
                                rows: '15',
                                value: this.values.userMentioned(),
                                style: 'margin-bottom: 10px',
                                oninput: withAttr('value', this.values.userMentioned),
                            }),
                            m('label', app.translator.trans('fof-pretty-mail.admin.settings.postMentioned')),
                            m('br'),
                            Button.component(
                                {
                                    type: 'button',
                                    style: 'margin: 10px 0 10px',
                                    className: 'Button Button--primary',
                                    onclick: () => {
                                        if (confirm(app.translator.trans('fof-pretty-mail.admin.settings.confirm') + ' postMentioned?')) {
                                            this.values.postMentioned(defaults.postMentioned);
                                        }
                                    },
                                },
                                app.translator.trans('fof-pretty-mail.admin.settings.reset')
                            ),
                            m('textarea.FormControl', {
                                rows: '15',
                                value: this.values.postMentioned(),
                                style: 'margin-bottom: 10px',
                                oninput: withAttr('value', this.values.postMentioned),
                            }),
                            m('h1', app.translator.trans('fof-pretty-mail.admin.css_settings.label')),
                            m(
                                'div',
                                {
                                    className: 'helpText',
                                    style: 'margin: 10px 0 10px',
                                },
                                app.translator.trans('fof-pretty-mail.admin.css_settings.help', { strong: <strong /> })
                            ),
                            Switch.component(
                                {
                                    className: 'Form-group',
                                    state: this.values.includeCSS() === '1',
                                    onchange: enabled => this.values.includeCSS(enabled ? '1' : '0'),
                                },
                                app.translator.trans('fof-pretty-mail.admin.css_settings.switch_label')
                            ),
                            Button.component(
                                {
                                    type: 'submit',
                                    className: 'Button Button--primary',
                                    loading: this.loading,
                                    disabled: !this.changed(),
                                },
                                app.translator.trans('core.admin.settings.submit_button')
                            ),
                        ]),
                    ]),
                ]),
            ]),
        ];
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
        this.fields.forEach(key => this.checkContent(key));

        if (this.loading) return;

        this.loading = true;

        const settings = {};

        this.fields.forEach(key => (settings[this.addPrefix(key)] = this.values[key]()));

        saveSettings(settings).then(() => {
            this.loading = false;
            app.alerts.show({ type: 'success' }, app.translator.trans('core.admin.basics.saved_message'));
        });
    }

    /**
     * @returns string
     */
    addPrefix(key) {
        return this.settingsPrefix + '.' + key;
    }

    checkContent(key) {
        if (this.values[key]().includes('$baseUrl')) {
            app.alerts.show({ type: 'warning' }, key + ": The use of $baseUrl is deprecated. Use $url->to('forum')->base() instead.");
        }
        if (this.values[key]().includes('app()->url()')) {
            app.alerts.show({ type: 'error' }, key + ": app()->url() has been replaced. Use $url->to('forum')->base() instead.");
        }
    }
}
