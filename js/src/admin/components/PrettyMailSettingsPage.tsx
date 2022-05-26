import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Button from 'flarum/common/components/Button';
import ItemList from 'flarum/common/utils/ItemList';
import Mithril from 'mithril';
import FieldSet from 'flarum/common/components/FieldSet';

import * as defaults from '../defaults';

export default class PrettyMailSettingsPage extends ExtensionPage {
  content() {
    return (
      <div className="PrettyMailSettingsPage">
        <div className="container">
          <div className="Form-group">
            <h2>{app.translator.trans('fof-pretty-mail.admin.settings.label')}</h2>
            <FieldSet label={app.translator.trans('fof-pretty-mail.admin.settings.attributes_label')}>
              {this.templateAttributes().map((attribute) => {
                return (
                  <p className="helpText">
                    <code>${attribute}</code> - {app.translator.trans(`fof-pretty-mail.admin.settings.attributes.${attribute}`)}
                  </p>
                );
              })}
            </FieldSet>
            <p className="helpText">{app.translator.trans('fof-pretty-mail.admin.settings.template_help')}</p>
            {this.buildSettingComponent({
              label: app.translator.trans('fof-pretty-mail.admin.settings.default'),
              help: app.translator.trans('fof-pretty-mail.admin.settings.default_help'),
              type: 'textarea',
              setting: 'fof-pretty-mail.mailhtml',
              rows: 10,
            })}
            <Button
              className="Button"
              onclick={() => {
                this.settings['fof-pretty-mail.mailhtml'](defaults.mailto);
                m.redraw();
              }}
            >
              {app.translator.trans('fof-pretty-mail.admin.settings.reset')}
            </Button>
            <div className="PrettyMailSettingsPage--specificTemplates">
              <h2>{app.translator.trans('fof-pretty-mail.admin.settings.notifications')}</h2>
              <p className="helpText">{app.translator.trans('fof-pretty-mail.admin.settings.notificationHelp')}</p>
              {this.templateItems().toArray()}
            </div>
            <div className="PrettyMailSettingsPage--CssSettings">
              <h2>{app.translator.trans('fof-pretty-mail.admin.css_settings.label')}</h2>
              {this.cssItems().toArray()}
            </div>
          </div>
          {this.submitButton()}
        </div>
      </div>
    );
  }

  templateAttributes() {
    return ['body', 'forumStyle', 'url', 'settings', 'link'].concat(app.forum.attribute('fof-pretty-mail.extra-template-attrs'));
  }

  cssItems() {
    const items = new ItemList<Mithril.Children>();

    items.add(
      'include-css',
      this.buildSettingComponent({
        label: app.translator.trans('fof-pretty-mail.admin.css_settings.switch_label'),
        help: app.translator.trans('fof-pretty-mail.admin.css_settings.help', { strong: <strong /> }),
        type: 'bool',
        setting: 'fof-pretty-mail.includeCSS',
      }),
      90
    );

    return items;
  }

  templateItems() {
    const items = new ItemList<Mithril.Children>();

    items.add(
      'user-mentioned',
      <div>
        {this.buildSettingComponent({
          label: app.translator.trans('fof-pretty-mail.admin.settings.userMentioned'),
          help: app.translator.trans('fof-pretty-mail.admin.settings.userMentioned_help'),
          type: 'textarea',
          setting: 'fof-pretty-mail.userMentioned',
          rows: 10,
        })}
        <Button
          className="Button"
          onclick={() => {
            this.settings['fof-pretty-mail.userMentioned'](defaults.userMentioned);
            m.redraw();
          }}
        >
          {app.translator.trans('fof-pretty-mail.admin.settings.reset')}
        </Button>
      </div>,
      95
    );

    items.add(
      'post-mentioned',
      <div>
        {this.buildSettingComponent({
          label: app.translator.trans('fof-pretty-mail.admin.settings.postMentioned'),
          help: app.translator.trans('fof-pretty-mail.admin.settings.postMentioned_help'),
          type: 'textarea',
          setting: 'fof-pretty-mail.postMentioned',
          rows: 10,
        })}
        <Button
          className="Button"
          onclick={() => {
            this.settings['fof-pretty-mail.postMentioned'](defaults.postMentioned);
            m.redraw();
          }}
        >
          {app.translator.trans('fof-pretty-mail.admin.settings.reset')}
        </Button>
      </div>,
      90
    );

    items.add(
      'new-post',
      <div>
        {this.buildSettingComponent({
          label: app.translator.trans('fof-pretty-mail.admin.settings.newPost'),
          help: app.translator.trans('fof-pretty-mail.admin.settings.newPost_help'),
          type: 'textarea',
          setting: 'fof-pretty-mail.newPost',
          rows: 10,
        })}
        <Button
          className="Button"
          onclick={() => {
            this.settings['fof-pretty-mail.newPost'](defaults.newPost);
            m.redraw();
          }}
        >
          {app.translator.trans('fof-pretty-mail.admin.settings.reset')}
        </Button>
      </div>,
      85
    );

    return items;
  }
}
