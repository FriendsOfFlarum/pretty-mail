import {extend} from 'flarum/extend';
import app from 'flarum/app';
import PrettyMailSettingsModal from './components/PrettyMailSettingsModal';

app.initializers.add('reflar-pretty-mail', app => {
    app.extensionSettings['reflar-pretty-mail'] = () => app.modal.show(new PrettyMailSettingsModal());
});