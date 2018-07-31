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


    describe("Testing Funnel 1B Sign-Up/Log-in Page", function() {

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

        afterEach( function(done) {
            browser.end().then(() => {
                done()
            });

        });

        it("Landing page 1B Sign-Up/Log-in test", async function () {

            // const texas = await browser
            await browser
            
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

                .then( async function(state){
                    console.log(state);
                    await browser
                        .select('#state', state)
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
                        .type('input[id="secret_question_answer"]', 'blue')

                        .evaluate(function() {
                          return $('select[id="secret_question"] option:contains("color")').val()
                        })
                        .then(function(question) {
                             return browser.select('#secret_question', question)
                        })

                    console.log("before await");

                    await myModule.state_select(browser, form);
                    await myModule.submit(browser, form);

                    console.log("after promise");
                    
                    
                });
        });
    });