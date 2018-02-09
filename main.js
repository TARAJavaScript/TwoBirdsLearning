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
                        that.model.data(JSON.parse(pResult.text).fruits); // -> { a: 2 }
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

			// create store for quantity
			this.quantities = tb.observable({});
        }

        Test.prototype = {
            namespace: 'app.Test',
            render: render
        };

        return Test;

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
				pData[ pIndex ]['quantity'] = 0;
            });

			// store pData in observable
			that.quantities( pData );
			
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
				if ( select.value ){
					var text = $(select).children('[value="' + select.value + '"]').html(),
						line = $( tb.parse(
							'<div><span>{id} - {short} - {text}</span><button>+</button><button>-</button><span>{quantity}</span></div>',
							{ 
								id: $(select).children('[value="' + select.value + '"]').attr('value'),
								short: $(select).children('[value="' + select.value + '"]').html()[0],
								text: text, // see above
								quantity: 0
							}
						));
						
					// append a line
					$(outerdiv)
						.append( line );	
					
					// add behaviour to +,- buttons
					var buttons = Array.from( line.children('button') );	
					
					// add '+' functionality
					$( buttons[0] )
						.on(
							'click',
							function(){
								// hint: "this" is the button DOM node!
								
								// set new data
								that.quantities(
									that.quantities().map(
										function( pFruit ){
											console.log( pFruit );
											return pFruit.text !== text 
												? pFruit
												: tb.extend( pFruit, { quantity: pFruit.quantity++ } );
										}
									)
								);

								console.log( that.quantities() );
							}
						)
				}                
            })

        }

    })()

);

// CONSTRUCT
new tb(
    app.Test, {},
    document.body
);
