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

            browser.end().then(() => {
                console.log("afterEach");
                done()
            });

        });

        it ("should fail with just name", function(done) {
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
                .click("button[class='submit_button']")
                .wait("#theForm")

                .then( function() {
                    return browser
                        .wait("#password")
                        .type("#password", "password8")
                        .wait("#password_verify")
                        .type("#password_verify", "password8")
                        .wait("#secret_question")
                        .select('#secret_question','[value="string:What is your favorite color?"]')
                        //.click('select[label="What is your favorite color?"]')
                        .type("#secret_question_answer", "yellow")
                        .click("button[class='submit_button']")
                        .wait(10000)
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

        // it ("should fail with just name and address", function() {
        //     console.log("just name and address");
        // });
        //
        // it ("should fail with just name and city", function() {
        //     console.log("just name and city");
        // });
        //
        // it ("should fail with just name and state", function() {
        //     console.log("just name and state");
        // });
        //
        // it ("should fail with just name, address, and city", function() {
        //     console.log("just name, address, and city");
        // });
        //
        // it ("should fail with just name, address, and state", function() {
        //     console.log("just name, address, and state");
        // });
        //
        // it ("should fail with just name, address, and zip", function() {
        //     console.log("just name, address, and zip");
        // });
        //
        // it ("should fail with just name, address, city, and state", function() {
        //     console.log("just name, address, zip, and state");
        // });
        //
        // it ("should fail with just name, address, city, and zip", function() {
        //     console.log("just name, address, and zip");
        // });
        //
        // it ("should fail with just name, address, city, and state", function() {
        //     console.log("just name, address, and state");
        // });
        //
        // it ("should fail with just address", function(){
        //     console.log("just address");
        //     //done();
        // });
        //
        // it ("should fail with just address and city", function() {
        //     console.log("just address and city");
        // });
        //
        // it ("should fail with just address and state", function() {
        //     console.log("just address and state");
        // });
        //
        // it ("should fail with just address and zip", function() {
        //     console.log("just address and zip");
        // });
        //
        // it ("should fail with just address, city, and state", function() {
        //     console.log("just address, city, and state");
        // });
        //
        // it ("should fail with just address, city, and zip", function() {
        //     console.log("just name, address, and zip");
        // });
        //
        // it ("should fail with just address, city, state, zip", function() {
        //     console.log("just name, address, zip, and state");
        // });
        //
        // it ("should fail with just city", function() {
        //     console.log("just city");
        // });
        //
        // it ("should fail with just city and state", function() {
        //     console.log("just city and state");
        // });
        //
        // it ("should fail with just city, state, and zip", function() {
        //     console.log("just city, state, and zip");
        // });
        //
        // it ("should fail with just state", function() {
        //     console.log("just state");
        // });
        //
        // it ("should fail with just state and zip", function() {
        //     console.log("just state and zip");
        // });
        //
        // it ("should fail with just zip", function() {
        //     console.log("just zip");
        // });

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
