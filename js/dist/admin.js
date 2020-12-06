module.exports=function(t){var n={};function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(o,r,function(n){return t[n]}.bind(null,r));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=10)}([function(t,n){t.exports=flarum.core.compat["components/Button"]},function(t,n){t.exports=flarum.core.compat["utils/withAttr"]},function(t,n){t.exports=flarum.core.compat.app},function(t,n){t.exports=flarum.core.compat.extend},function(t,n){t.exports=flarum.core.compat["components/AdminNav"]},function(t,n){t.exports=flarum.core.compat["components/AdminLinkButton"]},function(t,n){t.exports=flarum.core.compat["components/Page"]},function(t,n){t.exports=flarum.core.compat["utils/saveSettings"]},function(t,n){t.exports=flarum.core.compat["components/Switch"]},function(t,n){t.exports=flarum.core.compat["utils/Stream"]},function(t,n,e){"use strict";e.r(n);var o=e(2),r=e.n(o),a=e(3),s=e(4),i=e.n(s),l=e(5),p=e.n(l);var u=e(0),d=e.n(u),c=e(6),f=e.n(c),y=e(7),h=e.n(y),b=e(8),g=e.n(b),v=e(1),x=e.n(v),$=e(9),_=e.n($),w=function(t){var n,e;function o(){return t.apply(this,arguments)||this}e=t,(n=o).prototype=Object.create(e.prototype),n.prototype.constructor=n,n.__proto__=e;var r=o.prototype;return r.oninit=function(n){var e=this;t.prototype.oninit.call(this,n),this.fields=["mailhtml","newPost","postMentioned","userMentioned","includeCSS"],this.values=[],this.settingsPrefix="fof-pretty-mail";var o=app.data.settings;this.fields.forEach((function(t){return e.values[t]=_()(o[e.addPrefix(t)])}))},r.view=function(){var t=this;return[m("div",{style:"padding-bottom: 20px",className:"SettingsPage"},[m("div",{className:"container"},[m("Form-group",[m("Form",{onsubmit:this.onsubmit.bind(this)},[m("h1",app.translator.trans("fof-pretty-mail.admin.settings.label")),m("div",{className:"helpText",style:"margin: 10px 0 10px"},app.translator.trans("fof-pretty-mail.admin.settings.help",{strong:m("strong",null)})),m("label",app.translator.trans("fof-pretty-mail.admin.settings.default")),m("br"),d.a.component({type:"button",style:"margin-bottom: 10px",className:"Button Button--primary",onclick:function(){confirm(app.translator.trans("fof-pretty-mail.admin.settings.confirm")+" default?")&&t.values.mailhtml('<html>\n<head>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n    <style type="text/css">\n        body {\n            font-family: \'Open Sans\', sans-serif;\n            background: white;\n            color: #426799;\n            margin: 0;\n            padding: 0;\n        }\n        .content {\n            box-sizing: border-box;\n            width: 100%;\n            max-width: 500px;\n            margin: 0 auto;\n            padding: 10px 20px;\n        }\n        .header {\n            border-bottom: 1px solid #e8ecf3;\n         }\n         .header a {\n            color: {{ $settings->get(\'theme_primary_color\') }};\n            text-decoration: none;\n         }\n         .footer {\n            background: #e8ecf3;\n         }\n    </style>\n    @if ($forumStyle !== \'\')\n    <style>\n        {!! $forumStyle !!}\n    </style>\n    @endif\n</head>\n<body>\n<div class="header">\n    <div class="content">\n        <a href="{{ $url->to(\'forum\')->base() }}">{{ $settings->get(\'forum_title\') }}</a>\n    </div>\n</div>\n<div class="content">\n    {!! $body !!}\n</div>\n<div class="footer">\n    <div class="content">\n        <p>Sent from {{ $settings->get(\'forum_title\') }} using FoF Pretty Mail</p>\n    </div>\n</div>\n</body>\n</html>')}},app.translator.trans("fof-pretty-mail.admin.settings.reset")),m("textarea.FormControl",{rows:"15",value:this.values.mailhtml(),style:"margin: 10px 0 10px",oninput:x()("value",this.values.mailhtml)}),m("h3",app.translator.trans("fof-pretty-mail.admin.settings.notifications")),m("div",{className:"helpText",style:"margin-top: 10px"},app.translator.trans("fof-pretty-mail.admin.settings.notificationHelp")),m("label",app.translator.trans("fof-pretty-mail.admin.settings.newPost")),m("br"),d.a.component({type:"button",style:"margin: 10px 0 10px",className:"Button Button--primary",onclick:function(){confirm(app.translator.trans("fof-pretty-mail.admin.settings.confirm")+" newPost?")&&t.values.newPost('<html>\n<head>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n    <style type="text/css">\n        body {\n            font-family: \'Open Sans\', sans-serif;\n            background: white;\n            color: #426799;\n            margin: 0;\n            padding: 0;\n        }\n        .content {\n            box-sizing: border-box;\n            width: 100%;\n            max-width: 500px;\n            margin: 0 auto;\n            padding: 10px 20px;\n        }\n        .header {\n            border-bottom: 1px solid #e8ecf3;\n        }\n        .header a {\n            color: {{ $settings->get(\'theme_primary_color\') }};\n            text-decoration: none;\n        }\n        .footer {\n            background: #e8ecf3;\n        }\n    </style>\n    <style>\n        {!! $forumStyle !!}\n    </style>\n</head>\n<body>\n<div class="header">\n    <div class="content">\n        <a href="{{ $url->to(\'forum\')->base() }}">{{ $settings->get(\'forum_title\') }}</a>\n    </div>\n</div>\n<div class="content">\n    <div class="info">\n        <p>Hey {!! $user->display_name !!}!</p>\n\n        <p><a href="{{ $url->to(\'forum\')->route(\'user\', [\'username\' => $blueprint->post->user->username]) }}">{!! $blueprint->post->user->username !!}</a> made a post in a discussion you\'re following: <a href="{{ $url->to(\'forum\')->route(\'discussion\', [\'id\' => $blueprint->post->discussion_id, \'near\' => $blueprint->post->number]) }}">{!! $blueprint->post->discussion->title !!}</a></p>\n\n        ---\n\n    </div>\n    <br/>\n    <div class="post-content">\n        {!! $blueprint->post->formatContent() !!}\n    </div>\n    <br/>\n    <div class="info">\n        ---\n\n        <p>You won\'t receive any more notifications about this discussion until you\'re up-to-date.</p>\n    </div>\n</div>\n<div class="footer">\n    <div class="content">\n        <p>Sent from {{ $settings->get(\'forum_title\') }} using FoF Pretty Mail</p>\n    </div>\n</div>\n</body>\n</html>')}},app.translator.trans("fof-pretty-mail.admin.settings.reset")),m("textarea.FormControl",{rows:"15",value:this.values.newPost(),style:"margin-bottom: 10px",oninput:x()("value",this.values.newPost)}),m("label",app.translator.trans("fof-pretty-mail.admin.settings.userMentioned")),m("br"),d.a.component({type:"button",style:"margin: 10px 0 10px",className:"Button Button--primary",onclick:function(){confirm(app.translator.trans("fof-pretty-mail.admin.settings.confirm")+" userMentioned?")&&t.values.userMentioned('<html>\n<head>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n    <style type="text/css">\n        body {\n            font-family: \'Open Sans\', sans-serif;\n            background: white;\n            color: #426799;\n            margin: 0;\n            padding: 0;\n        }\n        .content {\n            box-sizing: border-box;\n            width: 100%;\n            max-width: 500px;\n            margin: 0 auto;\n            padding: 10px 20px;\n        }\n        .header {\n            border-bottom: 1px solid #e8ecf3;\n        }\n        .header a {\n            color: {{ $settings->get(\'theme_primary_color\') }};\n            text-decoration: none;\n        }\n        .footer {\n            background: #e8ecf3;\n        }\n    </style>\n    <style>\n        {!! $forumStyle !!}\n    </style>\n</head>\n<body>\n<div class="header">\n    <div class="content">\n        <a href="{{ $url->to(\'forum\')->base() }}">{{ $settings->get(\'forum_title\') }}</a>\n    </div>\n</div>\n<div class="content">\n    <div class="info">\n        <p>Hey {!! $user->display_name !!}!</p>\n\n        <p><a href="{{!! $url->to(\'forum\')->route(\'user\', [\'username\' => $blueprint->post->user->username]) !!}}">{!! $blueprint->post->user->username !!}</a> mentioned you in a post in <a href="{{!! $url->to(\'forum\')->route(\'discussion\', [\'id\' => $blueprint->post->discussion_id, \'near\' => $blueprint->post->number]) !!}}">{!! $blueprint->post->discussion->title !!}</a>.</p>\n\n        ---\n\n    </div>\n    <br/>\n    <div class="post-content">\n        {!! $blueprint->post->formatContent() !!}\n    </div>\n    <br/>\n</div>\n<div class="footer">\n    <div class="content">\n        <p>Sent from {{ $settings->get(\'forum_title\') }} using FoF Pretty Mail</p>\n    </div>\n</div>\n</body>\n</html>')}},app.translator.trans("fof-pretty-mail.admin.settings.reset")),m("textarea.FormControl",{rows:"15",value:this.values.userMentioned(),style:"margin-bottom: 10px",oninput:x()("value",this.values.userMentioned)}),m("label",app.translator.trans("fof-pretty-mail.admin.settings.postMentioned")),m("br"),d.a.component({type:"button",style:"margin: 10px 0 10px",className:"Button Button--primary",onclick:function(){confirm(app.translator.trans("fof-pretty-mail.admin.settings.confirm")+" postMentioned?")&&t.values.postMentioned('<html>\n<head>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n    <style type="text/css">\n        body {\n            font-family: \'Open Sans\', sans-serif;\n            background: white;\n            color: #426799;\n            margin: 0;\n            padding: 0;\n        }\n        .content {\n            box-sizing: border-box;\n            width: 100%;\n            max-width: 500px;\n            margin: 0 auto;\n            padding: 10px 20px;\n        }\n        .header {\n            border-bottom: 1px solid #e8ecf3;\n        }\n        .header a {\n            color: {{ $settings->get(\'theme_primary_color\') }};\n            text-decoration: none;\n        }\n        .footer {\n            background: #e8ecf3;\n        }\n    </style>\n    <style>\n        {!! $forumStyle !!}\n    </style>\n</head>\n<body>\n<div class="header">\n    <div class="content">\n        <a href="{{ $url->to(\'forum\')->base() }}">{{ $settings->get(\'forum_title\') }}</a>\n    </div>\n</div>\n<div class="content">\n    <div class="info">\n        <p>Hey {!! $user->display_name !!}!</p>\n\n        <p><a href="{{ $url->to(\'forum\')->route(\'user\', [\'username\' => $blueprint->reply->user->username]) }}">{!! $blueprint->reply->user->username !!}</a> replied to your post (#{!! $blueprint->post->number !!}) in <a href="{{ $url->to(\'forum\')->route(\'discussion\', [\'id\' => $blueprint->post->discussion_id, \'near\' => $blueprint->reply->number]) }}">{!! $blueprint->post->discussion->title !!}</a>.</p>\n\n        ---\n\n    </div>\n    <br/>\n    <div class="post-content">\n        {!! $blueprint->reply->formatContent() !!}\n    </div>\n    <br/>\n</div>\n<div class="footer">\n    <div class="content">\n        <p>Sent from {{ $settings->get(\'forum_title\') }} using FoF Pretty Mail</p>\n    </div>\n</div>\n</body>\n</html>')}},app.translator.trans("fof-pretty-mail.admin.settings.reset")),m("textarea.FormControl",{rows:"15",value:this.values.postMentioned(),style:"margin-bottom: 10px",oninput:x()("value",this.values.postMentioned)}),m("h1",app.translator.trans("fof-pretty-mail.admin.css_settings.label")),m("div",{className:"helpText",style:"margin: 10px 0 10px"},app.translator.trans("fof-pretty-mail.admin.css_settings.help",{strong:m("strong",null)})),g.a.component({className:"Form-group",state:"1"===this.values.includeCSS(),onchange:function(n){return t.values.includeCSS(n?"1":"0")}},app.translator.trans("fof-pretty-mail.admin.css_settings.switch_label")),d.a.component({type:"submit",className:"Button Button--primary",loading:this.loading,disabled:!this.changed()},app.translator.trans("core.admin.settings.submit_button"))])])])])]},r.changed=function(){var t=this;return this.fields.some((function(n){return t.values[n]()!==app.data.settings[t.addPrefix(n)]}))},r.onsubmit=function(t){var n=this;if(t.preventDefault(),this.fields.forEach((function(t){return n.checkContent(t)})),!this.loading){this.loading=!0;var e={};this.fields.forEach((function(t){return e[n.addPrefix(t)]=n.values[t]()})),h()(e).then((function(){n.loading=!1,app.alerts.show({type:"success"},app.translator.trans("core.admin.basics.saved_message"))}))}},r.addPrefix=function(t){return this.settingsPrefix+"."+t},r.checkContent=function(t){this.values[t]().includes("$baseUrl")&&app.alerts.show({type:"warning"},t+": The use of $baseUrl is deprecated. Use $url->to('forum')->base() instead."),this.values[t]().includes("app()->url()")&&app.alerts.show({type:"error"},t+": app()->url() has been replaced. Use $url->to('forum')->base() instead.")},o}(f.a);r.a.initializers.add("fof-pretty-mail",(function(){app.routes["fof-pretty-mail"]={path:"/fof/pretty-mail",component:w},app.extensionSettings["fof-pretty-mail"]=function(){return m.route.set(app.route("fof-pretty-mail"))},Object(a.extend)(i.a.prototype,"items",(function(t){t.add("fof-pretty-mail",p.a.component({href:app.route("fof-pretty-mail"),icon:"fas fa-envelope-open",description:app.translator.trans("fof-pretty-mail.admin.nav.desc")},"Pretty Mail"))}))}))}]);
//# sourceMappingURL=admin.js.map