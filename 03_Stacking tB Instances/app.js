tb.namespace('app.Test').set(

    (function () {
        var $ = tb.dom;

        function Test() {
            var that = this;

            that.handlers = {
                init: render.bind(that)
            }

            Test.prototype = {
                render: render
            }

        }


        console.log('alive');

        return Test;

        function render() {

            var that = this;


        }
    })()

);
