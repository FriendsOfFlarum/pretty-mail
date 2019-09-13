<?php

/*
 * Original Copyright Flarum. Licensed under MIT License
 * See license text at https://github.com/flarum/core/blob/master/LICENSE
 */

namespace Flarum\User;

use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Event\EmailChangeRequested;
use Flarum\User\Event\Registered;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Contracts\Translation\Translator;
use Illuminate\Mail\Message;
use s9e\TextFormatter\Bundles\Fatdown;

class EmailConfirmationMailer
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;
    /**
     * @var Mailer
     */
    protected $mailer;
    /**
     * @var UrlGenerator
     */
    protected $url;
    /**
     * @var Translator
     */
    protected $translator;

    /**
     * Flarum assets directory, to find out where the css is.
     *
     * @var string
     */
    protected $assets_dir = (__DIR__.'/../../../../../public/assets/');

    /**
     * @param \Flarum\Settings\SettingsRepositoryInterface $settings
     * @param Mailer                                       $mailer
     * @param UrlGenerator                                 $url
     * @param Translator                                   $translator
     */
    public function __construct(SettingsRepositoryInterface $settings, Mailer $mailer, UrlGenerator $url, Translator $translator)
    {
        $this->settings = $settings;
        $this->mailer = $mailer;
        $this->url = $url;
        $this->translator = $translator;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Registered::class, [$this, 'whenUserWasRegistered']);
        $events->listen(EmailChangeRequested::class, [$this, 'whenUserEmailChangeWasRequested']);
    }

    /**
     * @param \Flarum\User\Event\Registered $event
     */
    public function whenUserWasRegistered(Registered $event)
    {
        $user = $event->user;
        if ($user->is_email_confirmed) {
            return;
        }
        $data = $this->getEmailData($user, $user->email);
        $body = $this->translator->trans('core.email.activate_account.body', $data);

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
        ], function (Message $message) use ($user, $data) {
            $message->to($user->email);
            $message->subject('['.$data['{forum}'].'] '.$this->translator->trans('core.email.activate_account.subject'));
        });
    }

    /**
     * @param \Flarum\User\Event\EmailChangeRequested $event
     */
    public function whenUserEmailChangeWasRequested(EmailChangeRequested $event)
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
     * @param User   $user
     * @param string $email
     *
     * @return EmailToken
     */
    protected function generateToken(User $user, $email)
    {
        $token = EmailToken::generate($email, $user->id);
        $token->save();

        return $token;
    }

    /**
     * Get the data that should be made available to email templates.
     *
     * @param User   $user
     * @param string $email
     *
     * @return array
     */
    protected function getEmailData(User $user, $email)
    {
        $token = $this->generateToken($user, $email);

        return [
            '{username}' => $user->display_name,
            '{url}'      => $this->url->to('forum')->route('confirmEmail', ['token' => $token->token]),
            '{forum}'    => $this->settings->get('forum_title'),
        ];
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
