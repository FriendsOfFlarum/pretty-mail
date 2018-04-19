<?php

/**
 *  This file is part of reflar/gamification.
 *
 *  Copyright (c) ReFlar.
 *
 *  http://reflar.io
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 */

namespace Flarum\Core\Listener;

use Flarum\Core;
use Flarum\Core\EmailToken;
use Flarum\Core\User;
use Flarum\Event\UserEmailChangeWasRequested;
use Flarum\Event\UserWasRegistered;
use Flarum\Forum\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Mail\Message;
use s9e\TextFormatter\Bundles\Fatdown;
use Symfony\Component\Translation\TranslatorInterface;

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
     * @var TranslatorInterface
     */
    protected $translator;

    /**
     * @param \Flarum\Settings\SettingsRepositoryInterface $settings
     * @param Mailer                                       $mailer
     * @param UrlGenerator                                 $url
     * @param TranslatorInterface                          $translator
     */
    public function __construct(
        SettingsRepositoryInterface $settings,
        Mailer $mailer,
        UrlGenerator $url,
        TranslatorInterface $translator
    ) {
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
        $events->listen(UserWasRegistered::class, [$this, 'whenUserWasRegistered']);
        $events->listen(UserEmailChangeWasRequested::class, [$this, 'whenUserEmailChangeWasRequested']);
    }

    /**
     * @param \Flarum\Event\UserWasRegistered $event
     */
    public function whenUserWasRegistered(UserWasRegistered $event)
    {
        $user = $event->user;

        if ($user->is_activated) {
            return;
        }

        $data = $this->getEmailData($user, $user->email);

        $body = $this->translator->trans('core.email.activate_account.body', $data);

        $matches = $this->prepareData($body);

        $body = Fatdown::render(Fatdown::parse($body));

        $file = preg_grep('~^forum-.*\.css$~', scandir(__DIR__.'/../../../../../../assets'));

        $this->mailer->send('pretty-mail::emails.default', [
            'body'       => $body,
            'settings'   => $this->settings,
            'baseUrl'    => app()->url(),
            'forumStyle' => file_get_contents(__DIR__.'/../../../../../../assets/'.reset($file)),
            'link'       => $matches[0],
        ], function (Message $message) use ($user, $data) {
            $message->to($user->email);
            $message->subject('['.$data['{admin}'].'] '.$this->translator->trans('core.email.activate_account.subject'));
        });
    }

    /**
     * @param \Flarum\Event\UserEmailChangeWasRequested $event
     */
    public function whenUserEmailChangeWasRequested(UserEmailChangeWasRequested $event)
    {
        $email = $event->email;
        $data = $this->getEmailData($event->user, $email);

        $body = $this->translator->trans('core.email.confirm_email.body', $data);

        $matches = $this->prepareData($body);

        $body = Fatdown::render(Fatdown::parse($body));

        $file = preg_grep('~^forum-.*\.css$~', scandir(__DIR__.'/../../../../../../assets'));

        $this->mailer->send('pretty-mail::emails.default', [
            'body'       => $body,
            'settings'   => $this->settings,
            'baseUrl'    => app()->url(),
            'forumStyle' => file_get_contents(__DIR__.'/../../../../../../assets/'.reset($file)),
            'link'       => $matches[0],
        ], function (Message $message) use ($email, $data) {
            $message->to($email);
            $message->subject('['.$data['{admin}'].'] '.$this->translator->trans('core.email.activate_account.subject'));
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
        preg_match("/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/m",
            $body, $matches);

        if ($this->settings->get('reflar-prettymail.mailhtml') !== file_get_contents(__DIR__.'/../../../resources/views/emails/default.blade.php')) {
            file_put_contents(__DIR__.'/../../../resources/views/emails/default.blade.php',
                $this->settings->get('reflar-prettymail.mailhtml'));
        }

        return $matches;
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
            '{username}' => $user->username,
            '{url}'      => $this->url->toRoute('confirmEmail', ['token' => $token->id]),
            '{admin}'    => $this->settings->get('forum_title'),
        ];
    }
}
