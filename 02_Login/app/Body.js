tb.namespace('app.Body').set(

    (function () {
        var $ = tb.dom;

        function Body() {
            var that = this;

            that.handlers = {
                init: render.bind(that)
            }

        }

        Body.prototype = {
            namespace: 'app.Body',
            render: render
        }

        return Body;

        function render() {
            var that = this;

            //console.log('body::render', that.target);

            new tb(
                'app.Login', {},
                that.target.appendChild(document.createElement('div'))
            );

        }

    })()

);
