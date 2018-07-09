"use strict";
const Nightmare = require( "nightmare" ),
      expect = require( "chai" ).expect,
      BASE_URL = "https://www.kidguard.com/",
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

// const JasmineConsoleReporter = require('jasmine-console-reporter');
// const reporter = new JasmineConsoleReporter({
//     colors: 1,           // (0|false)|(1|true)|2
//     cleanStack: 1,       // (0|false)|(1|true)|2|3
//     verbosity: 4,        // (0|false)|1|2|(3|true)|4
//     listStyle: 'indent', // "flat"|"indent"
//     activity: false,     // boolean or string ("dots"|"star"|"flip"|"bouncingBar"|...)
//     emoji: true,
//     beep: true
// });
//
// jasmine.env.clearReporters();
// jasmine.addReporter(reporter);
// jasmine.execute();

//describe("10 day free trial funnel", function() {

    describe("A spec to ensure user info is filled", function() {
        // var timeoutPromise = new Promise(function(resolve, reject){
        //     setTimeout(resolve, 5000);
        // });
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

            // browser.end().then(() => {
            //     console.log("afterEach");
            //     done()
            // });

        });

        it ("should submit with all forms filled", function(done) {
            console.log("just name"); 
            browser
                // inputting name
                .wait('#headerNav-cta span')
                .click('#headerNav-cta span')
                .wait('fieldset[ng-class="{ \'hide\': vm.currentStep !== 2 }"].hide')
                .wait('#first_name')
                .type("#first_name", "andrea")
                .type("#last_name", "vora")
                .type("#email", "andrea@gmail.com")
                .type("#phone", "1111111111")
                .wait("button[class='submit_button']")
                .click("button[class='submit_button']")
                .wait("#theForm")

                .then( function() {
                    return browser
                        .wait("#password")
                        .type("#password", "password8")
                        .wait("#password_verify")
                        .type("#password_verify", "password8")
                        .wait("#secret_question")
                        
                        .evaluate(function() {
                            return $('select[id="secret_question"] option:contains("color")').val()
                        })
                        .then(function(value){
                            return browser.select('#secret_question', value)
                        })
                        .then(function (){
                            return browser
                                .type("#secret_question_answer", "yellow")
                                .wait("button[class='submit_button']")
                                .click("button[class='submit_button']")
                                .wait("#stripe-card-number")
                                .then( function() {
                                    return browser
                                        .type("#name_on_card", "andrea vora")
                                        .wait(1000)
                                        // .type("input[name='cardnumber']", "4242424242424242")
                                        .type("#stripe-card-number input", "4242424242424242")
                                        .wait(1000)
                                        .type("#stripe-card-cvc input", "424")
                                        .wait(1000)
                                        .type("#stripe-card-expiry input", "424")
                                        .type("#address1", "123 Main Street")
                                        .type("#city", "Smallville")
                                        .type("#state", "CA")
                                        .type("#stripe-postal-code", "12345")
                                        .click("input[type='checkbox']")
                                        // .wait(30000)

                                        console.log("friday")
                                        var selector = document.getElementByClass("btn -btn-success padding-30-lr padding-15-tb -font-lg")
                                        .then( function() {
                                            console.log(selector)
                                            console.log("hello")
                                        })
                                        
                                        // expect($("button[ng-click='vm.submit()']")).toHaveAttr('disabled')
                                        expect(selector).hasAttribute("disabled").toBe(true)
                                        // expect(document.getElementById("myBtn")).toContain('')
                                })
                        })
                        
                })


                .then(( ) => {
                    console.log("finished")
                    done();
                })
                .catch((err) => {
                    console.error('error: ', err);
                    done(err);
                });

        });

        
    });

    // describe("A spec to ensure credit info is filled", function() {
    //     console.log("setting up timeout");
    //     var timeoutPromise = new Promise(function(resolve, reject){
    //         setTimeout(resolve, 5000);
    //     });
    //     // start up with the blank list
    //     beforeEach( function(done)  {
    //           console.log("beforeEACH");
    //           timeoutPromise.then(function() {
    //               // timeout resolved, test initialization in this block done
    //               console.log("error");
    //               done('error');
    //           });
    //           browser
    //               .goto( BASE_URL )
    //               .evaluate(() => {
    //                     return localStorage.clear();
    //               })
    //               .then(() => {
    //                   done();
    //               });
    //     });
    //
    //     // disconnect and close Electron process
    //     afterEach( function() {
    //           browser
    //           .end();
    //     });
    // });
//});

// describe("Try now funnel", function() {
//
// });
