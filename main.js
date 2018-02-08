tb.namespace('app.Test').set(

    (function() {
        var $ = tb.dom;

        function Test(pConfig) {
            var that = this;
            that.config = pConfig;

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
            that.model.data.observe(function modelDataChanged(pData) {
                that.render(pData);
            });

            // read data
            that.model.read({});
        }

        Test.prototype = {
            namespace: 'app.Test',
            render: render
        };

        return Test;

        function render(pData) {
            var that = this;
            var select = document.createElement('select');

            pData.sort(function(a, b) {
                var textA = a.text.toUpperCase(); 
                var textB = b.text.toUpperCase(); 

                if (textA < textB) {
                    return -1;
                }
                if (textA > textB) {
                    return 1;
                }
            });

            $(that.target).append(select);

            pData.forEach(function createOptions(pOption) {

                $('<option>')
                    .attr("value", pOption.value)
                    .html(pOption.text)
                    .appendTo('select');
            })
        }
    })()

);

// CONSTRUCT
new tb(
    app.Test, 
	{},
    document.body
);
