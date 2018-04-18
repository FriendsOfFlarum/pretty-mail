# Pretty Mail by ReFlar

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://gitlab.com/ReFlar/pretty-mail/blob/master/LICENSE) [![Latest Stable Version](https://img.shields.io/packagist/v/reflar/pretty-mail.svg)](https://github.com/ReFlar/pretty-mail)

A [Flarum](http://flarum.org) extension that allows you to make custom html templates for emails!


### Usage

- Configure your custom email template from the extension settings
- This supports all emails sent by Flarum, and 3rd party extensions

### Installation

Install it with composer:

```bash
composer require reflar/pretty-mail
```

Next, run this command in your Flarum root dir:

```bash
composer dump-autoload
```

Then login and enable the extension.

### Important Note 

Due to how Flarum handles certain emails, I had to utilize a "hack" to get it to work. This should be fixable in beta 8. Please report any issues you have to our Github.

### To Do

- Requests?

### Issues

- [Open an issue on Github](https://github.com/reflar/pretty-mail/issues) 

### Links

- [Github](https://github.com/reflar/pretty-mail)
- [Packagist](https://packagist.org/packages/reflar/pretty-mail)