import {extend} from "flarum/extend";
import AdminNav from "flarum/components/AdminNav";
import AdminLinkButton from "flarum/components/AdminLinkButton";
import settingsPage from "./components/settingsPage";

export default function () {
    app.routes['reflar-pretty-mail'] = {path: '/reflar/pretty-mail', component: settingsPage.component()};

    app.extensionSettings['reflar-pretty-mail'] = () => m.route(app.route('reflar-pretty-mail'));

    extend(AdminNav.prototype, 'items', items => {
        items.add('reflar-pretty-mail', AdminLinkButton.component({
            href: app.route('reflar-pretty-mail'),
            icon: 'envelope-open',
            children: 'Pretty Mail',
            description: app.translator.trans('reflar-prettymail.admin.nav.desc')
        }));
    });
}