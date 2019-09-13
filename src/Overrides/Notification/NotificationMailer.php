<?php

/*
 * Original Copyright Flarum. Licensed under MIT License
 * See license text at https://github.com/flarum/core/blob/master/LICENSE
 */

namespace Flarum\Notification;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Mail\Message;

class NotificationMailer
{
    /**
     * @var Mailer
     */
    protected $mailer;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * Flarum assets directory, to find out where the css is.
     *
     * @var string
     */
    protected $assets_dir = (__DIR__.'/../../../../../public/assets/');

    /**
     * @param Mailer $mailer
     */
    public function __construct(Mailer $mailer, SettingsRepositoryInterface $settings)
    {
        $this->mailer = $mailer;
        $this->settings = $settings;
    }

    /**
     * @param MailableInterface $blueprint
     * @param User              $user
     */
    public function send(MailableInterface $blueprint, User $user)
    {
        $blade = [];
        preg_match("/\.(.*)$/", $blueprint->getEmailView()['text'], $blade);

        if ($this->settings->get('fof-pretty-mail.'.$blade[1]) !== file_get_contents(__DIR__.'/../../../resources/views/emails/'.$blade[1].'.blade.php')) {
            file_put_contents(
                __DIR__.'/../../../resources/views/emails/'.$blade[1].'.blade.php',
                $this->settings->get('fof-pretty-mail.'.$blade[1])
            );
        }

        $includeCSS = $this->settings->get('fof-pretty-mail.includeCSS') == '1';
        if ($includeCSS) {
            $file = preg_grep('~^forum-.*\.css$~', scandir($this->assets_dir));
        }

        $this->mailer->send(
            'pretty-mail::emails.'.$blade[1],
            [
                'user'       => $user,
                'baseUrl'    => app()->url(),
                'blueprint'  => $blueprint,
                'settings'   => $this->settings,
                'forumStyle' => $includeCSS ? file_get_contents($this->assets_dir.reset($file)) : '',
            ],
            function (Message $message) use ($blueprint, $user) {
                $message->to($user->email, $user->username)
                    ->subject($blueprint->getEmailSubject());
            }
        );
    }
}
