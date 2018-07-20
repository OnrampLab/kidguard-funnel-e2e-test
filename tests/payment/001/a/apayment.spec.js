"use strict";
var myModule = require('../../abstracted.library.js');

const Nightmare = require( "nightmare" ),
      expect = require( "chai" ).expect,
      BASE_URL = "https://www.kidguard.com/funnel/payment/011/a?first_name=Vernon&last_name=Swanson&email=zinoto@mailinator.com&phone=+921-79-3649008&site=cellmon&log_id=12574785&password=Pa$$w0rd!&password_verify=Pa$$w0rd!&secret_question_answer=Reprehenderit%20sunt%20voluptatibus%20non%20repudiandae%20q&secret_question=What%20was%20your%20first%20grade%20teacher%27s%20name%3F"
      ,
      onError = ( err ) => {
        console.error( "Test-runner failed:", err );
      },
      browser = new Nightmare({
            openDevTools: {
            mode: 'detach'
          },
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
                console.log("afterEach");
                done()
            });

        });

        it ("should submit with all forms filled for 'try now' button", function(done) {
            console.log("abstracted a");
            var selectors = {"address": "#address1", "city": "#city", "state": "#state", "checkbox": "input[type='checkbox']", "name": "input[name='name_on_card']", "cardnum": "input[name='card_number']", "cvv": "input[name='cvv']", "zipcode": "input[name='zipcode']", "expmonth": "input[name='expiration_month']", "expyear": "input[name='expiration_year']"};
            var input = {"address": "123 Main Street", "city": "Smallville", "state": "CA", "name": "Andrea Vora", "cardnum": "4242424242424242", "cvv": "123", "zipcode": "12345", "expmonth": "04", "expyear": "24"};
            myModule.formABCD_input(browser, done, selectors, input);

        });
    });