import app from 'flarum/app';
import SettingsPage from './components/SettingsPage';

app.initializers.add('fof-pretty-mail', () => {
    app.extensionData.for('fof-pretty-mail').registerPage(SettingsPage);
});
