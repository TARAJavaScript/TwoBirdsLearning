tb.namespace('app.Test').set(

    (function() {
        var $ = tb.dom;

        var TestLine = (function() {

            function TestLine(pConfig, pTarget) {

                var that = this;

                that.target = pTarget;
                that.data = pConfig;

                that.render();
            }

            TestLine.prototype = {
                namespace: 'TestLine',
                lineTemplate: '<div ><span>{id} - {text}</span><button>+</button><span class="quantity">{quantity}</span>' + '<button>-</button><span></span></div>',
                render: render,
                inc: inc,
                dec: dec
            };

            return TestLine;

            function render() {

                var that = this,
                    line = $(tb.parse(
                        that.lineTemplate,
                        that.data
                    )),
                    buttons = $('button', line[0]);

                $(that.target).append(line); // add line to outerdiv
                that.target = line[0]; // redefine target as line inside the outerdiv

                // add "data-id" attribute
                $(that.target).attr('data-id', that.data.id);

                // add '+' functionality
                $(buttons[0])
                    .on(
                        'click',
                        inc.bind(that)
                    );

                // add '-' functionality
                $(buttons[1])
                    .on(
                        'click',
                        dec.bind(that)
                    );

            }

            function inc() {
                var that = this;

                that.data.quantity++;

                $('.quantity', that.target).html(that.data.quantity.toString());

            }

            function dec() {
                var that = this;

                if (that.data.quantity > 0) {
                    that.data.quantity--;
                    $('.quantity', that.target).html(that.data.quantity.toString());
                }

            }

        })();

        function Test(pConfig) {
            var that = this;

            that.config = pConfig;

            that.handlers = {
                init: init
            };

        }

        Test.prototype = {
            namespace: 'app.Test',
            'tb.Require': [
                'app/Test.css'
            ],
            render: render
        };

        return Test;

        function init() {
            var that = this;

            that.model = new tb.CRUD({
                'read': {
                    url: 'fruits.json',
                    method: 'GET',
                    success: function(pResult) {
                        that.model.data(JSON.parse(pResult.text).fruits);
                    },
                    error: function(pResult) {
                        console.log('an error occured', pResult);
                    }
                }
            });

            // when data has changed, render
            that.model.data.observe(render.bind(that));

            // read data
            that.model.read();

        }

        function render(pData) {
            var that = this,
                select = document.createElement('select'),
                button = document.createElement('button'),
                outerdiv = document.createElement('div');

            // add an empty record as preset
            select.appendChild(document.createElement('option'));

            // button caption
            $(button)
                .html('add');

            // sort data for dropdown alphabetically
            pData.sort(function(a, b) {
                return a.text.toUpperCase() < b.text.toUpperCase() ? -1 : 1;
            });

            // create dropdown entries before rendering
            pData.forEach(function createOptions(pOption, pIndex) {
                $('<option>')
                    .attr("value", pOption.value)
                    .html(pOption.text)
                    .appendTo(select);
                pData[pIndex]['quantity'] = 0;
            });

            // add some general classes
            $(outerdiv)
                .addClass('w3-container w3-padding-32');

            // append all elements to document.body
            $(that.target)
                .append(select)
                .append(button)
                .append(outerdiv);

            // add selected fruit to list
            $(button).on('click', function() {

                // if select has a selected fruit			
                if (select.value) {
                    var id = $(select).children('[value="' + select.value + '"]').attr('value'),
                        existingLine = $('[data-id="' + select.value + '"]', that.target);

                    // append a line if it doesnt exist
                    if (!existingLine[0]) {
                        var text = $(select).children('[value="' + select.value + '"]').html();

                        new tb(
                            TestLine, {
                                id: id,
                                text: text, // see above
                                quantity: 1
                            },
                            outerdiv
                        );

                    }

                }
            })

        }

    })()

);
