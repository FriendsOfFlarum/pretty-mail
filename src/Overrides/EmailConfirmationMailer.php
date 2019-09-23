<?php

/*
 * Original Copyright Flarum. Licensed under MIT License
 * See license text at https://github.com/flarum/core/blob/master/LICENSE
 */

namespace FoF\PrettyMail\Overrides;

use Flarum\User\Event\EmailChangeRequested;
use Illuminate\Mail\Message;
use s9e\TextFormatter\Bundles\Fatdown;

class EmailConfirmationMailer extends \Flarum\User\EmailConfirmationMailer
{
    public function handle(EmailChangeRequested $event)
    {
        $email = $event->email;
        $data = $this->getEmailData($event->user, $email);

        $body = $this->translator->trans('core.email.confirm_email.body', $data);
        $matches = $this->prepareData($body);
        $body = Fatdown::render(Fatdown::parse($body));

        $includeCSS = $this->settings->get('fof-pretty-mail.includeCSS') == '1';

        if ($includeCSS) {
            $file = preg_grep('~^forum-.*\.css$~', scandir($this->assets_dir));
        }

        $this->mailer->send('pretty-mail::emails.default', [
            'body'       => $body,
            'settings'   => $this->settings,
            'baseUrl'    => app()->url(),
            'forumStyle' => $includeCSS ? file_get_contents($this->assets_dir.reset($file)) : '',
            'link'       => $matches[0],
        ], function (Message $message) use ($email, $data) {
            $message->to($email);
            $message->subject('['.$data['{forum}'].'] '.$this->translator->trans('core.email.confirm_email.subject'));
        });
    }

    /**
     * @param $body
     *
     * @return array
     */
    public function prepareData($body)
    {
        $matches = [];
        preg_match(
            "/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/m",
            $body,
            $matches
        );

        if ($this->settings->get('fof-pretty-mail.mailhtml') !== file_get_contents(__DIR__.'/../../../resources/views/emails/default.blade.php')) {
            file_put_contents(
                __DIR__.'/../../../resources/views/emails/default.blade.php',
                $this->settings->get('fof-pretty-mail.mailhtml')
            );
        }

        return $matches;
    }
}
