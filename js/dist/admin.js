module.exports=function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=8)}([function(t,n){t.exports=flarum.core.compat["components/Button"]},function(t,n){t.exports=flarum.core.compat.app},function(t,n){t.exports=flarum.core.compat.extend},function(t,n){t.exports=flarum.core.compat["components/AdminNav"]},function(t,n){t.exports=flarum.core.compat["components/AdminLinkButton"]},function(t,n){t.exports=flarum.core.compat["components/Alert"]},function(t,n){t.exports=flarum.core.compat["components/Page"]},function(t,n){t.exports=flarum.core.compat["utils/saveSettings"]},function(t,n,e){"use strict";e.r(n);var r=e(1),o=e.n(r),a=e(2),i=e(3),s=e.n(i),l=e(4),p=e.n(l);var d=e(5),c=e.n(d),u=e(0),f=e.n(u),y=e(6),h=e.n(y),b=e(7),v=e.n(b),g=function(t){var n,e;function r(){return t.apply(this,arguments)||this}e=t,(n=r).prototype=Object.create(e.prototype),n.prototype.constructor=n,n.__proto__=e;var o=r.prototype;return o.init=function(){var t=this;this.fields=["mailhtml","newPost","postMentioned","userMentioned"],this.values={},this.settingsPrefix="reflar-prettymail";var n=app.data.settings;this.fields.forEach(function(e){return t.values[e]=m.prop(n[t.addPrefix(e)])})},o.view=function(){var t=this;return[m("div",{style:"padding-bottom: 20px",className:"SettingsPage"},[m("div",{className:"container"},[m("Form-group",[m("Form",{onsubmit:this.onsubmit.bind(this)},[m("h1",app.translator.trans("reflar-prettymail.admin.settings.label")),m("div",{className:"helpText",style:"margin: 10px 0 10px"},app.translator.trans("reflar-prettymail.admin.settings.help",{strong:m("strong",null)})),m("label",app.translator.trans("reflar-prettymail.admin.settings.default")),m("br"),f.a.component({type:"button",style:"margin-bottom: 10px",className:"Button Button--primary",children:app.translator.trans("reflar-prettymail.admin.settings.reset"),onclick:function(){confirm(app.translator.trans("reflar-prettymail.admin.settings.confirm")+" default?")&&t.values.mailhtml('<html>\n    <head>\n        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n        <style type="text/css">\n            body {\n                font-family: \'Open Sans\', sans-serif;\n                background: white;\n                color: #426799;\n                margin: 0;\n                padding: 0;\n            }\n            .content {\n                box-sizing: border-box;\n                width: 100%;\n                max-width: 500px;\n                margin: 0 auto;\n                padding: 10px 20px;\n            }\n            .header {\n                border-bottom: 1px solid #e8ecf3;\n             }\n             .header a {\n                color: {{ $settings->get(\'theme_primary_color\') }};\n                text-decoration: none;\n             }\n             .footer {\n                background: #e8ecf3;\n             }\n        </style>\n    </head>\n</html>\n<body>\n    <div class="header">\n        <div class="content">\n            <a href="{{ $baseUrl }}">{{ $settings->get(\'forum_title\') }}</a>\n        </div>\n    </div>\n    <div class="content">\n        {!! $body !!}\n    </div>\n    <div class="footer">\n        <div class="content">\n            <p>Sent from {{ $settings->get(\'forum_title\') }} using the Pretty Mail extension</p>\n        </div>\n    </div>\n</body>')}}),m("textarea.FormControl",{rows:"15",value:this.values.mailhtml(),style:"margin: 10px 0 10px",oninput:m.withAttr("value",this.values.mailhtml)}),m("h3",app.translator.trans("reflar-prettymail.admin.settings.notifications")),m("div",{className:"helpText",style:"margin-top: 10px"},app.translator.trans("reflar-prettymail.admin.settings.notificationHelp")),m("label",app.translator.trans("reflar-prettymail.admin.settings.newPost")),m("br"),f.a.component({type:"button",style:"margin: 10px 0 10px",className:"Button Button--primary",children:app.translator.trans("reflar-prettymail.admin.settings.reset"),onclick:function(){confirm(app.translator.trans("reflar-prettymail.admin.settings.confirm")+" newPost?")&&t.values.newPost('<html>\n    <head>\n        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n        <style type="text/css">\n            body {\n                font-family: \'Open Sans\', sans-serif;\n                background: white;\n                color: #426799;\n                margin: 0;\n                padding: 0;\n            }\n            .content {\n                box-sizing: border-box;\n                width: 100%;\n                max-width: 500px;\n                margin: 0 auto;\n                padding: 10px 20px;\n            }\n            .header {\n                border-bottom: 1px solid #e8ecf3;\n            }\n            .header a {\n                color: {{ $settings->get(\'theme_primary_color\') }};\n                text-decoration: none;\n            }\n            .footer {\n                background: #e8ecf3;\n            }\n        </style>\n        <style>\n            {!! $forumStyle !!}\n        </style>\n    </head>\n</html>\n<body>\n    <div class="header">\n        <div class="content">\n            <a href="{{ $baseUrl }}">{{ $settings->get(\'forum_title\') }}</a>\n        </div>\n    </div>\n    <div class="content">\n        <div class="info">\n            <p>Hey {!! $user->display_name !!}!</p>\n\n            <p>{!! $blueprint->post->user->display_name !!} made a post in a discussion you\'re following: {!! $blueprint->post->discussion->title !!}</p>\n\n            <p>To view the new activity, check out the following link:</p>\n            <p>{!! $baseUrl !!}/d/{!! $blueprint->post->discussion_id !!}/{!! $blueprint->post->number !!}</p>\n\n            ---\n\n        </div>\n        <br/>\n        <div class="post-content">\n            {!! $blueprint->post->contentHtml !!}\n        </div>\n        <br/>\n        <div class="info">\n            ---\n\n            <p>You won\'t receive any more notifications about this discussion until you\'re up-to-date.</p>\n        </div>\n    </div>\n    <div class="footer">\n        <div class="content">\n            <p>Sent from {{ $settings->get(\'forum_title\') }} using the Pretty Mail extension</p>\n        </div>\n    </div>\n</body>\n')}}),m("textarea.FormControl",{rows:"15",value:this.values.newPost(),style:"margin-bottom: 10px",oninput:m.withAttr("value",this.values.newPost)}),m("label",app.translator.trans("reflar-prettymail.admin.settings.userMentioned")),m("br"),f.a.component({type:"button",style:"margin: 10px 0 10px",className:"Button Button--primary",children:app.translator.trans("reflar-prettymail.admin.settings.reset"),onclick:function(){confirm(app.translator.trans("reflar-prettymail.admin.settings.confirm")+" userMentioned?")&&t.values.userMentioned('<html>\n    <head>\n        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n        <style type="text/css">\n            body {\n                font-family: \'Open Sans\', sans-serif;\n                background: white;\n                color: #426799;\n                margin: 0;\n                padding: 0;\n            }\n            .content {\n                box-sizing: border-box;\n                width: 100%;\n                max-width: 500px;\n                margin: 0 auto;\n                padding: 10px 20px;\n            }\n            .header {\n                border-bottom: 1px solid #e8ecf3;\n            }\n            .header a {\n                color: {{ $settings->get(\'theme_primary_color\') }};\n                text-decoration: none;\n            }\n            .footer {\n                background: #e8ecf3;\n            }\n        </style>\n        <style>\n            {!! $forumStyle !!}\n        </style>\n    </head>\n</html>\n<body>\n    <div class="header">\n        <div class="content">\n            <a href="{{ $baseUrl }}">{{ $settings->get(\'forum_title\') }}</a>\n        </div>\n    </div>\n    <div class="content">\n        <div class="info">\n            <p>Hey {!! $user->display_name !!}!</p>\n\n            <p>{!! $blueprint->post->user->username !!} mentioned you in a post in {!! $blueprint->post->discussion->title !!}.</p>\n\n            <p>{!! $baseUrl !!}/d/{!! $blueprint->post->discussion_id !!}/{!! $blueprint->post->number !!}</p>\n\n            ---\n\n        </div>\n        <br/>\n        <div class="post-content">\n            {!! $blueprint->post->contentHtml !!}\n        </div>\n        <br/>\n    </div>\n    <div class="footer">\n        <div class="content">\n            <p>Sent from {{ $settings->get(\'forum_title\') }} using the Pretty Mail extension</p>\n        </div>\n    </div>\n</body>\n')}}),m("textarea.FormControl",{rows:"15",value:this.values.userMentioned(),style:"margin-bottom: 10px",oninput:m.withAttr("value",this.values.userMentioned)}),m("label",app.translator.trans("reflar-prettymail.admin.settings.postMentioned")),m("br"),f.a.component({type:"button",style:"margin: 10px 0 10px",className:"Button Button--primary",children:app.translator.trans("reflar-prettymail.admin.settings.reset"),onclick:function(){confirm(app.translator.trans("reflar-prettymail.admin.settings.confirm")+" postMentioned?")&&t.values.postMentioned('<html>\n    <head>\n        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n        <style type="text/css">\n            body {\n                font-family: \'Open Sans\', sans-serif;\n                background: white;\n                color: #426799;\n                margin: 0;\n                padding: 0;\n            }\n            .content {\n                box-sizing: border-box;\n                width: 100%;\n                max-width: 500px;\n                margin: 0 auto;\n                padding: 10px 20px;\n            }\n            .header {\n                border-bottom: 1px solid #e8ecf3;\n            }\n            .header a {\n                color: {{ $settings->get(\'theme_primary_color\') }};\n                text-decoration: none;\n            }\n            .footer {\n                background: #e8ecf3;\n            }\n        </style>\n        <style>\n            {!! $forumStyle !!}\n        </style>\n    </head>\n</html>\n<body>\n    <div class="header">\n        <div class="content">\n            <a href="{{ $baseUrl }}">{{ $settings->get(\'forum_title\') }}</a>\n        </div>\n    </div>\n    <div class="content">\n        <div class="info">\n            <p>Hey {!! $user->display_name !!}!</p>\n\n            <p>{!! $blueprint->reply->user->username !!} replied to your post (#{!! $blueprint->post->number !!}) in {!! $blueprint->post->discussion->title !!}.</p>\n\n            <p>{!! app()->url() !!}/d/{!! $blueprint->reply->discussion_id !!}/{!! $blueprint->reply->number !!}</p>\n\n            ---\n\n        </div>\n        <br/>\n        <div class="post-content">\n            {!! $blueprint->reply->contentHtml !!}\n        </div>\n        <br/>\n    </div>\n    <div class="footer">\n        <div class="content">\n            <p>Sent from {{ $settings->get(\'forum_title\') }} using the Pretty Mail extension</p>\n        </div>\n    </div>\n</body>\n')}}),m("textarea.FormControl",{rows:"15",value:this.values.postMentioned(),style:"margin-bottom: 10px",oninput:m.withAttr("value",this.values.postMentioned)}),f.a.component({type:"submit",className:"Button Button--primary",children:app.translator.trans("core.admin.settings.submit_button"),loading:this.loading,disabled:!this.changed()})])])])])]},o.changed=function(){var t=this;return this.fields.some(function(n){return t.values[n]()!==app.data.settings[t.addPrefix(n)]})},o.onsubmit=function(t){var n=this;if(t.preventDefault(),!this.loading){this.loading=!0,app.alerts.dismiss(this.successAlert);var e={};this.fields.forEach(function(t){return e[n.addPrefix(t)]=n.values[t]()}),v()(e).then(function(){n.loading=!1,app.alerts.show(n.successAlert=new c.a({type:"success",children:app.translator.trans("core.admin.basics.saved_message")}))})}},o.addPrefix=function(t){return this.settingsPrefix+"."+t},r}(h.a);o.a.initializers.add("reflar-pretty-mail",function(){app.routes["reflar-pretty-mail"]={path:"/reflar/pretty-mail",component:g.component()},app.extensionSettings["reflar-pretty-mail"]=function(){return m.route(app.route("reflar-pretty-mail"))},Object(a.extend)(s.a.prototype,"items",function(t){t.add("reflar-pretty-mail",p.a.component({href:app.route("reflar-pretty-mail"),icon:"envelope-open",children:"Pretty Mail",description:app.translator.trans("reflar-prettymail.admin.nav.desc")}))})})}]);
//# sourceMappingURL=admin.js.map