"use strict";
var myModule = require('../../payment.library.js');

const Nightmare = require( "nightmare" ),
      expect = require( "chai" ).expect,
      BASE_URL = "https://www.kidguard.com/funnel/payment/011/b?first_name=Vernon&last_name=Swanson&email=zinoto%40mailinator.com&phone=%2B921-79-3649008&site=cellmon&log_id=12574785&password=Pa%24%24w0rd!&password_verify=Pa%24%24w0rd!&secret_question_answer=Reprehenderit%20sunt%20voluptatibus%20non%20repudiandae%20q&secret_question=What%20was%20your%20first%20grade%20teacher%27s%20name%3F",
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
                console.log("afterEach");
                done()
            });

        });

        it ("should submit with all forms filled for 'try now' button", function(done) {
            myModule.formABCD_input(browser, done);
            // myModule.formB_input(browser);
            
        });
    });