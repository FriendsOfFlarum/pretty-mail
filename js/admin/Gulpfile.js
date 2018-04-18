var gulp = require('flarum-gulp');

gulp({
    modules: {
        'reflar/prettymail': [
            'src/**/*.js'
        ]
    }
});