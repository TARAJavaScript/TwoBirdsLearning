tb.namespace('app.Landing').set(

    (function () {
        var $ = tb.dom;

        /*
        define CLASS
        */
        function Landing() {
            var that = this;

            // that.target is not needed, its document.body anyway

            // run init when requirements (see below) have loaded
            that.handlers = {
                init: init
            }

        }

        /*
        class PROTOTYPE
        */
        Landing.prototype = {

            // run init() after we loaded these files
            'tb.Require': [
                '/app/Landing.css',
                '/app/Landing.html'
            ],

            render: render
        }

        // return our class, will be put into the variable defined by namespace (that is: window.app.Login)
        return Landing;


        /* 
        private functions
        */
        function init() {
            var that = this;

            that.render(); // call method directly

        }

        function render() {
            var that = this,
                template = tb.require.get('/app/Landing.html').trim();

            //console.log(template);
            $(that.target)
                .empty()
                .append($(template))
                .clean();


        }

    })()

);
