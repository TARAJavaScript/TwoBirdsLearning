tb.namespace('app.Test').set(

    (function () {
        var $ = tb.dom;

        function Test(pConfig) {

            var that = this;
            that.config = pConfig;

            that.handlers = {
                init: init
            };
        };

        Test.prototype = {
            namespace: 'app.Test',
            render: render
        };

        console.log('alive');

        return Test;

        function init() {
            console.log('init');
        };

        function render() {
            console.log('render');
        };

    })()

);
