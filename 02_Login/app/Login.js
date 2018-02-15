tb.namespace('app.Login').set(

    (function () {
        var $ = tb.dom;

        function Login() {
            var that = this;

            that.handlers = {
                init: init
            }

        }

        Login.prototype = {

            namespace: 'app.Login',

            'tb.Require': [
                '/app/Login.css',
                '/app/Login.html'
            ],

            render: render
        }

        return Login;

        function init() {
            var that = this;

            that.render();

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
                    console.log('click', $( 'form.login', that.target).values() );
                    ev.stopPropagation();
                    ev.preventDefault();
                });
        }

    })()

);
