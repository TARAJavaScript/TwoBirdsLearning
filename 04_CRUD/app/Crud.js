tb.namespace('app.Crud').set(

    (function () {
        var $ = tb.dom;

        function Crud(pConfig) {

            var that = this;
            that.config = pConfig;

            that.handlers = {
                init: init
            };
        };

        Crud.prototype = {
            namespace: 'app.Crud',
            render: render
        };

        console.log('crud defined');

        return Crud;

        function init() {
            var that = this;

            that.model = new tb.CRUD({

                'read': {
                    url: 'https://jsonplaceholder.typicode.com/users/',
                    method: 'GET',
                    success: function () {
                        console.log('read all');
                    },
                    error: function () {
                        console.log('read error');
                    }
                },

                'delete': {
                    url: 'https://jsonplaceholder.typicode.com/users/{id}',
                    method: 'DELETE',
                    success: function () {
                        console.log('delete');
                    },
                    error: function () {
                        console.log('delete error');
                    }
                }

            });

            console.log('init');
            that.render();
        };

        function render() {
            var that = this,
                input = document.createElement('input'),
                buttonIndex = document.createElement('button'),
                buttonDelete = document.createElement('button');

            $(buttonIndex).html('index');
            $(buttonDelete).html('delete');

            $(input).attr("placeholder", "Element index");
            $(that.target).append(input);
            $(that.target).append(buttonIndex);
            $(that.target).append(buttonDelete);


            $(buttonIndex).on('click', function () {
                let ix = parseInt(input.value);

                console.log('ix:' + ix);

                if (!isNaN(ix) && (ix > 0)) {
                    that.model.read({
                        id: input.value
                    });

                    console.log('if, read ID');
                } else {
                    that.model.read();
                    console.log('if, read all');
                };

                console.log('click' + input.value);
            });

            $(buttonDelete).on('click', function () {
                let ix = parseInt(input.value);

                console.log('ix:' + ix);

                if (!isNaN(ix) && (ix > 0)) {
                    that.model.delete({
                        id: input.value
                    });

                    console.log('if, delete ID');
                };

                console.log('click' + input.value);
            });

            console.log('render', that);
        };

    })()

);
