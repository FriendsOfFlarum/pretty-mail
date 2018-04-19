import {extend} from 'flarum/extend';
import app from 'flarum/app';
import addSettingsPage from './addSettingsPage';

app.initializers.add('reflar-pretty-mail', app => {
    addSettingsPage()
});