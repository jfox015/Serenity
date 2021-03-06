'use strict';
/**
 * APP CONFIG
 * 
 * A standalone file to place all config information such as app config items, paths for 
 * service calls and major angular config items.
 * 
 * @version 0.1
 * @author Jeff Fox (@jfox015)
 * 
 */
angApp
.value('isAdmin', false)
.value('config', {
    mode: 'staging' // options development, test, staging, production
})
.constant('paths', {
    /**
     * PATHS
     * Determines if the app should look to the server (API) for data or local 
     * JSON data mocks instead
     */
    development: {
        "login": '/app/data/user.json',
        "logout": '/app/data/logout.json',
        "user": '/app/data/user.json',
        "users": '/app/data/users.json',
        "settings": '/app/data/settings.json'
    },
    test: {
        "login": '/app/data/user.json',
        "logout": '/app/data/logout.json',
        "user": '/app/data/user.json',
        "users": '/app/data/users.json',
        "settings": '/app/data/settings.json'
    },
    staging: {
        "login": '/api/login/:email/:password',
        "logout": '/api/logout',
        "user": '/api/user/:userId',
        "users": '/api/users',
        "settings": '/api/settings'
    },
    production: {
        "login": '/api/login/:email/:password/:token',
        "logout": '/api/logout',
        "user": '/api/user/:userId',
        "users": '/api/users',
        "settings": '/api/settings'
    }
})
.config(function($locationProvider) {
        $locationProvider.html5Mode(true);
    }
)
;