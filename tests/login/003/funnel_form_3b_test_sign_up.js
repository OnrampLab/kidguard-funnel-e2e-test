/*
testing Funnel 3B's Log-In/Sign-Up page

FIRST PAGE FOR FUNNEL 3B
Link: https://www.kidguard.com/funnel/form/001/b?lander=home&
Description: Testing basic information section for funnel b including
first name, last name, email, phone, state, and zip code

SECOND PAGE FOR FUNNEL 3B
Description: Testing the second portion of the user's information
including "create your password," "verify your password,"
"choose a secret question," and "answer the question"
*/
"use strict";
const Nightmare = require( "nightmare" ),
      expect = require( "chai" ).expect,
      BASE_URL = "https://www.kidguard.com/funnel/form/003/b?lander=home&",
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

      describe("Testing Funnel 3B Sign-Up/Log-in Page", function(){
        beforeEach(function(done) {
          browser.goto(BASE_URL)
          .evaluate(() => {
            localStorage.clear();
            return window.location.href;
          })
          .then((url) => {
            console.log('done')
            console.log(url);
            done();
          })
          .catch((error) => {
            console.log('error')
            done(error)
          });
        });

        it("Landing page 3B Sign-Up/Log-in test", function(done) {
          browser
            .goto(BASE_URL)
            .wait('#first_name')
            .type('input[name="first_name"]', 'Aahad')
            .type('input[name="last_name"]', 'Patel')
            .type('input[name="email"]', 'aahad.patel786@gmail.com')
            .type('input[name="phone"]', '469-258-6923')
            .click('button.submit_button.primary--red')
            /*
            SECOND PAGE FOR FUNNEL 3B
            Description: Testing the second portion of the user's information
            including "create your password," "verify your password,"
            "choose a secret question," and "answer the question"
            */
            .wait('#password')
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
                 .click('button.submit_button.primary--red')
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
