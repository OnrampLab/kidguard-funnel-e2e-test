/*
testing Funnel 1C's Log-In/Sign-Up page

FIRST PAGE FOR FOR FUNNEL 1C
Link: https://www.kidguard.com/funnel/form/001/c?lander=home&
Description: Testing basic information section for funnel 1c including
most worried about, first name, last name, email, phone, relationship to child,
state, zip code, card number, cvv expire date, address,  and city

SECOND PAGE FOR FUNNEL 1C
Description: Including "state", "zipcode", "phone",
"create your password," "verify your password,"
"choose a secret question, " "answer the question"
*/
"use strict";
const Nightmare = require( "nightmare" ),
      expect = require( "chai" ).expect,
      BASE_URL = "https://www.kidguard.com/funnel/form/001/c?lander=home&",
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

      describe("Testing Funnel 1C Sign-Up/Log-in Page", function(){
        beforeEach(function(done) {
          browser.goto(BASE_URL)
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

        it("Landing page 1C Sign-Up/Log-in test", function(done) {
          browser
            .goto(BASE_URL)
            .wait('#first_name')
            .type('input[name="first_name"]', 'Aahad')
            .type('input[name="last_name"]', 'Patel')
            .type('input[name="email"]', 'aahad.patel786@gmail.com')
            .click('button.submit_button')
            /*
            SECOND PAGE FOR FUNNEL 1C
            Description: Including "state", "zipcode", "phone",
            "create your password," "verify your password,"
            "choose a secret question, " "answer the question"
            */
            .wait('#state')
            //dropdown
            .evaluate(function() {
              return $('select[id="state"] option:contains("TX")').val()
            })
            .then(function(value){
              return browser.select('#state', value)
            })
            .then(function() {
              return browser
                .type('input[name="zipcode"]', '75074')
                .type('input[name="phone"]', '4692586923')
                .type('input[name="password"]', 'password8')
                .type('input[name="password_verify"]', 'password8')
                 .evaluate(function() {
                   return $('select[id="secret_question"] option:contains("color")').val()
                 })
                 .then(function(value){
                   return browser.select('#secret_question', value)
                 })
                 .then(function() {
                   return browser
                     .type('input[id="secret_question_answer"]', 'blue')
                     .click('button.submit_button')
                     .catch(error => {
                       console.error('Search failed:', error)
                     });
                 })
                 .then(function() {
                   browser
                   .wait(4000)
                   .evaluate(function() {
                       return location.href;
                   })
                   .then(function(url) {
                       expect(url.includes('payment')).to.equal(true);
                   })
                   .then(function() {
                     done();
                   })
                   .catch(error => {
                     console.error('Error: ', error)
                     done(error);
                   });
                 })
           });
        });
        //expect condition
      });
