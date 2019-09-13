import app from 'flarum/app';
import addSettingsPage from './addSettingsPage';

app.initializers.add('fof-pretty-mail', () => {
    // Add a settings pane for the extension
    addSettingsPage();
});
