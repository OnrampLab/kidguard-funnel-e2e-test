// /*
// testing Funnel 1B's Log-In/Sign-Up page
//
// FIRST PAGE FOR FUNNEL 1B: https://www.kidguard.com/funnel/form/001/b?lander=home&
// Description: Including "first name," "last name," "email," "phone," "state,"
// and "zip code"
//
// SECOND PAGE FOR FUNNEL 1B
// includes passowrd,verify password, and security question/answer
// */

"use strict";
var myModule = require('../login.library.js');

const form = { 
                  "name": "input[name='first_name']",
                  "last": 'input[name="last_name"]',
                  "zipcode": "input[id='zipcode']", 
                  "email": 'input[name="email"]',
                  "phone": 'input[name="phone"]',
                  "exp": "0", 
                  "expmonth": "input[name='expiration_month']", 
                  "expyear": "input[name='expiration_year']",
                  "zipcode": 'input[id="zipcode"]',
                  "password": 'input[id="password"]', 
                  "verify": 'input[id="password_verify"]',
                  "secret_q": 'select[id="secret_question"] option:contains("color")',
                  "secret_answer": 'input[id="secret_question_answer"]',
                  "password_submit": 'button.submit_button'

}

const Nightmare = require( "nightmare" ),
      expect = require( "chai" ).expect,
      BASE_URL = "https://www.kidguard.com/funnel/form/001/b?lander=home&",
      onError = ( err ) => {
        console.error( "Test-runner failed:", err );
      },
      browser = new Nightmare({
        height: 678,
        width: 1024,
        show: true,
        typeInterval: 20,
        pollInterval: 5000,
        waitTimeout: 30000,
      });
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;



      describe("Testing Funnel 1B Sign-Up/Log-in Page", function(){

          beforeEach(function(done) {
              browser
                  .goto(BASE_URL)
                  .evaluate(() => {
                      localStorage.clear();
                      return window.location.href;
                  })
                  .then((url) => {
                      console.log('Entering ' + url);
                      done();
                  })
                  .catch((error) => {
                      console.log('error')
                      done(error)
                  });
          });

          it("Landing page 1B Sign-Up/Log-in test", function(done) {

            browser
                //SAME
                .goto(BASE_URL)
                .wait('#first_name')
                .type('input[name="first_name"]', 'Aahad')
                .type('input[name="last_name"]', 'Patel')
                .type('input[name="email"]', 'aahad.patel786@gmail.com')
                .type('input[name="phone"]', '469-258-6923')

                //DROPDOWN MENU
                .evaluate(function() {
                    return $('select[id="state"] option:contains("TX")').val();
                })

                .then(function(texas){
                    console.log(texas);
                    return browser
                        .select('#state', texas)
                        .wait('#zipcode')
                        .type('input[id="zipcode"]', '75074')

                        .click('button.submit_button')
                        /*
                        SECOND PAGE FOR FUNNEL 1B
                        includes password,verify password, and security question/answer
                        */


                        //SAME
                        .wait('#password')
                        .type('input[id="password"]', 'password8')
                        .type('input[id="password_verify"]', 'password8')
                        // .evaluate(function() {
                        //   return $('select[id="secret_question"] option:contains("color")').val()
                        // })

                        // });

                        // .then(function() {
                        //     //  return browser.select('#secret_question', value)
                            
                        // })

                        // not sure if i need this
                        // .then(( ) => {
                        //     done();
                        // })
                        // .catch((err) => {
                        //     console.error('error: ', err);
                        //     done(err);
                        // });

                    // ***********************************the code below is not executed

                    console.log("before promise");
                    let selectsubmit = new Promise((resolve, reject) => {
                          console.log("creating promise!");
                          myModule.submit(browser, done, form, myModule.state_select(browser, done, form), function() {
                              console.log("promise resolved")
                              resolve("Submitted");
                          });
                    });

                    console.log("after promise");
                    
                    selectsubmit.then(() => {
                        return browser
                            .then(function() {
                              done();
                            })
                            .catch(error => {
                                console.error('Error: ', error);
                                done(error);
                            });
                    });
                        
                        // .wait(5000);
                        //  .then(function() {
                        //    return browser
                        //      .type('input[id="secret_question_answer"]', 'blue')
                        //      .click('button.submit_button')
                        //      .catch(error => {
                        //        console.error('Search failed:', error)
                        //      });
                        //  })
                        //  .then(function() {
                        //    browser
                        //       .wait(4000)
                        //       .evaluate(function() {
                        //           return location.href;
                        //       })
                        //       .then(function(url) {
                        //           expect(url.includes('payment')).to.equal(true);
                        //       })
                            // return browser
                        
                        //  })
                })

                .then(( ) => {
                    done();
                })
                .catch((err) => {
                    console.error('error: ', err);
                    done(err);
                });

                

              // });

          });
      });
