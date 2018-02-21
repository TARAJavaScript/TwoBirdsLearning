tb.namespace('app.Login').set(

    (function () {
        var $ = tb.dom;

        /*
        define CLASS
        */
        function Login() {
            var that = this;

            // create the model to post login data
            that.model = new tb.CRUD({
                'update': {
                    url: '/login',
                    method: 'POST',
                    success: function (pRequest) { //success is HTTP 200 - 399
                        console.log('success', pRequest);

                        loginSuccess(JSON.parse(pRequest.text));
                    },
                    error: function (pRequest) { //success is HTTP 400 - 599
                        loginError(JSON.parse(pRequest.text));
                    },
                }
            });

            // run init when requirements (see below) have loaded
            that.handlers = {
                init: init,
                sendCredentials: sendCredentials // now sendCredentials also is an event handler, as well as a direct method (see below)
            }

        }

        /*
        class PROTOTYPE
        */
        Login.prototype = {

            // run init() after we loaded these files
            'tb.Require': [
                '/app/Login.css',
                '/app/Login.html'
            ],

            render: render,

            sendCredentials: sendCredentials
        }

        // return our class, will be put into the variable defined by namespace (that is: window.app.Login)
        return Login;


        /* 
        private functions
        */
        function init() {
            var that = this;

            that.render(); // call method directly

        }

        function render() {
            var that = this,
                template = tb.require.get('/app/Login.html').trim();

            //console.log(template);
            $(that.target)
                .addClass('centerlay')
                .append($(template))
                .clean();

            loginButton = $('button', that.target)[0];

            $(loginButton).on(
                'click',
                function (ev) {
                    console.log('loginButton click');
                    //that.sendCredentials(); // call sendCredentials() method of the instance
                    that.trigger('sendCredentials'); // send 'sendCredentials event to the instance
                    ev.stopPropagation();
                    ev.preventDefault();
                });


            // tb.dom( that.target.firstChild ).addClass( 'text-center' );
        }

        function sendCredentials() {
            var that = this;

            console.log('sendCredentials', tb.extend({}, $('form.login').values()));
            that.model.update(
                tb.extend({},
                    $('form.login').values()
                )
            );
        }

        function loginSuccess(pData) {
            console.log('loginSuccess', pData);

            document.body.replaceWith(document.createElement('body')); // garbage collect previous content

            new tb(
                'app.Landing', {
                    token: 'sdfsdfsdfsdfdsdf'
                },
                document.body
            );
        }

        function loginError(pData) {
            console.log('loginError', pData);
        }

    })()

);
