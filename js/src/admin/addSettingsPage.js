import { extend } from 'flarum/extend';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import SettingsPage from './components/SettingsPage';

export default function() {
    app.routes['fof-pretty-mail'] = { path: '/fof/pretty-mail', component: SettingsPage.component() };

    app.extensionSettings['fof-pretty-mail'] = () => m.route(app.route('fof-pretty-mail'));

    extend(AdminNav.prototype, 'items', items => {
        items.add(
            'fof-pretty-mail',
            AdminLinkButton.component({
                href: app.route('fof-pretty-mail'),
                icon: 'fas fa-envelope-open',
                children: 'Pretty Mail',
                description: app.translator.trans('fof-pretty-mail.admin.nav.desc'),
            })
        );
    });
}
