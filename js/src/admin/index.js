import app from 'flarum/admin/app';
import PrettyMailSettingsPage from './components/PrettyMailSettingsPage';

export * from './components';

app.initializers.add('fof-pretty-mail', () => {
    app.extensionData.for('fof-pretty-mail').registerPage(PrettyMailSettingsPage);
});
