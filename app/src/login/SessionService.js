'use strict';
/**
 *  SESSION SERVICE
 *  
 *  A common service that provides session storage functionality. It uses the HTML 5
 *  Session Storage object (if available) and backs down to a generic JavaScript 
 *  Object if not found (older browsers)
 *  
 *  @author Jeff Fox
 */
angApp
.service('SessionService', 
    function () {
        
        this.session = null;
        this.type = null;
        
        if (typeof(window.sessionStorage) !== 'undefined') {
            this.session = window.sessionStorage;
            this.type = 'html5session';
        }else {
            this.session =  { };
            this.type = 'object';
        }
        /**
         * CREATE SESSION
         * Creates a session id value
         * @param 	sessionId		The session ID
         *
         */
       this.create = function (sessionId) {
            if (this.type === 'html5session') {
                this.session.setItem("id", sessionId);
            } else {
                this.session.id = sessionId;
            }
        };
        /**
         * SET ITEM
         * Sets a data item to session storage
         * @param 	key		Value Key name
         * @param	value	Value
         */
        this.set = function(key, value) {
                this.session.setItem(key, value);
        };
        /**
         * GET ITEM
         * Returns a data item from session storage
         * @param 	key		Value Key name
         * 
         */
        this.get = function(key) {
             if (this.type === 'html5session') {
                 return this.session.getItem(key);
             } else {
                 return this.session[key];
             }
        };
        /**
         * DESTROY
         * Destroys the current session storage queue
         * 
         */
        this.destroy = function () {
            if (this.type === 'html5session') {
                this.session.clear();
            } else {
                this.session = {};
            }
        };
        return this;
    }
);