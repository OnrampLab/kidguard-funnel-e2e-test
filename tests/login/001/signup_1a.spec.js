/*
testing Funnel 1A's Log-In/Sign-Up page

FIRST PAGE FOR FOR FUNNEL 1A
Link: https://www.kidguard.com/funnel/form/001/a?lander=home&
Description: Testing basic information section for funnel b including
most worried about, first name, last name, email, phone, relationship to child,
state, zip code, card number, cvv expire date, address,  and city

SECOND PAGE FOR FUNNEL 1A
Description: Including "create your password," "verify your password,"
"choose a secret question, " "answer the question"
*/

"use strict";

const Nightmare = require( "nightmare" ),
    expect = require( "chai" ).expect,
    BASE_URL = "https://www.kidguard.com/funnel/form/001/a?lander=home&",
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

  
var myModule = require('../login.library.js');

const form = { 
    "name": "input[name='first_name']",
    "last": 'input[name="last_name"]',
    "zipcode": "input[id='zipcode']", 
    "address": 'input[placeholder="Address"]',
    "email": 'input[name="email"]',
    "phone": 'input[name="phone"]',
    "card": 'input[id="sq-card-number"]',
    "cvv": 'input[id="sq-cvv"]',
    "exp": "0", 
    "expmonth": 'input[class="form-control ng-pristine ng-untouched ng-empty ng-valid-min ng-valid-max ng-invalid ng-invalid-required ng-valid-maxlength"]', 
    "expyear": 'input[class="form-control ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required ng-valid-maxlength"]',
    "city": 'input[name="city"]',
    "state": '#state',
    "texas": 'select[id="state"] option:contains("TX")',
    "password": 'input[id="password"]', 
    "verify": 'input[id="password_verify"]',
    "secret_q": 'select[id="secret_question"] option:contains("color")',
    "secret_answer": 'input[id="secret_question_answer"]',
    "worry": 'input#most_worried_about_answer_0',
    "relation": 'input#relation_1',
    "password_submit": 'button.submit_button'
}

const base = {'selectors': form, 'page': browser};

    describe("Testing Funnel 1A Sign-Up/Log-in Page", function(){
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

        it("Landing page 1A Sign-Up/Log-in test", async function() {

            await myModule.details(base);
            await myModule.phone(base);
            await myModule.location(base);
            await myModule.payment(base);
            await myModule.password(base);
            await myModule.name(base);
        })
    });
