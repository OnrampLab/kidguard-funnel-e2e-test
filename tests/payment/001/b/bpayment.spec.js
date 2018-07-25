"use strict";
var myModule = require('../../payment.library.js');
var input = require('../../data.json');
var helper = require('../../formhelper.js');

const form = { 
                "name": "#name_on_card", 
                "cardnum": "#stripe-card-number input", 
                "cvc": "#stripe-card-cvc input", 
                "zipcode": "#stripe-postal-code", 
                "exp": "#stripe-card-expiry input", 
                "expmonth": "0", 
                "expyear": "0" 
            };

const form_type = "011/b?";

const Nightmare = require( "nightmare" ),
      expect = require( "chai" ).expect,
      BASE_URL = helper.urlgenerator(form_type),
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
            var selectors = helper.selectorgenerator(form);
            myModule.formABCD_input(browser, done, selectors, input);
        });
    });