const Nightmare = require( "nightmare" );
const querystring = require('querystring');

module.exports.formABCD_input = function (browser, done, selectors, input) {
    browser
        .wait(selectors["checkbox"])
        .type(selectors["address"], input["address"])
        .type(selectors["city"], input["city"])
        .type(selectors["state"], input["state"])
        .wait(1000)
        .click(selectors["checkbox"])
        .wait(1000)
        .type(selectors["name"], input["name"])
        .wait(1000)
        .type(selectors["cardnum"], input["cardnum"])
        .wait(1000)
        .type(selectors["cvc"], input["cvc"])
        .type(selectors["zipcode"], input["zipcode"])
        
        .then(function () {
            if (selectors.exp != 0) {
                return browser
                    .wait(selectors["exp"])
                    .type(selectors["exp"], input["exp"])
            } else {
                return browser
                    .wait(selectors["expmonth"])
                    .type(selectors["expmonth"], input["expmonth"])
                    .type(selectors["expyear"], input["expyear"])
   
            }
        })

        .then(function() {
            submit_check(browser, done);
        })

        .then(( ) => {
            done();
        })
        .catch((err) => {
            console.error('error: ', err);
            done(err);
        });

}

function submit_check(browser, done) {
    browser
        /* expectation to determine if submit button is enabled */
        .evaluate(function() {
            return $('button').attr('disabled');
        })
        .then(function(submit_button) {
            expect(submit_button).toBe(null); 
        })

        .then(( ) => {
            console.log("finished")
            done();
        })
        .catch((err) => {
            console.error('error: ', err);
            done(err);
        });
}   
