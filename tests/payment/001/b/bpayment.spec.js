"use strict";
var myModule = require('../../payment.library.js');
var input = require('../../data.json');
var helper = require('../../formhelper.js');

const Nightmare = require( "nightmare" ),
      expect = require( "chai" ).expect,
      BASE_URL = helper.urlgenerator('011/b?', 'Andrea', 'Vora', 'andrea@gmail.com', '1234567890', 'password8', 'password8', 'Reprehenderit sunt voluptatibus non repudiandae q', "What was your first grade teacher's name?")      
      ,
      onError = ( err ) => {
        console.error( "Test-runner failed:", err );
      },
      browser = new Nightmare({
          height: 768,
          width: 1024,
          show: true,
          typeInterval: 20,
          pollInterval: 5000,
          waitTimeout: 30000,
      });

      jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

    describe("A spec to ensure functionality when all info is filled", function() {
        // start up with the blank list
        beforeEach( function(done)  {
            
            browser
                .goto( BASE_URL )
                .evaluate(() => {
                    return localStorage.clear();
                })
                .then(() => {
                    done();
                })
                .catch((error) => done(error));
        });

        // disconnect and close Electron process
        afterEach( function(done) {

            browser.end().then(() => {
                done()
            });

        });

        it ("should submit with all forms filled for 'try now' button", function(done) {
            var selectors = helper.selectorgenerator( 
                                                        "#name_on_card",
                                                        "#stripe-card-number input",
                                                        "#stripe-card-cvc input", 
                                                        "#stripe-postal-code",
                                                        "#stripe-card-expiry input",
                                                        "0", 
                                                        "0"
                                                    );
            myModule.formABCD_input(browser, done, selectors, input);
        });
    });