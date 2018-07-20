const Nightmare = require( "nightmare" );

module.exports.formABCD_input = function (browser, done, selectors, input) {
    console.log("abcd");
    browser
        .wait(selectors["address"])
        .type(selectors["address"], input["address"])
        .type(selectors["city"], input["city"])
        .type(selectors["state"], input["state"])
        .wait(1000)
        .click(selectors["checkbox"])
        .wait(1000)
        .type(selectors["name"], input["name"])
        .wait(1000)
        .type(selectors["cardnum"], input["cardnum"])
        .type(selectors["cvv"], input["cvv"])
        .type(selectors["zipcode"], input["zipcode"])
        .wait(1000)

        .then(function (){
            if (selectors.exp) {
            return browser
                .type(selectors["exp"], input["exp"])
                .then( function() {
                    submit_check(browser, done);
                });
            } else if (selectors.expmonth) {
            return browser
                .type(selectors["expmonth"], input["expmonth"])
                .type(selectors["expyear"], input["expyear"])
                .then( function() {
                    submit_check(browser, done);
                });
            }
        });
}

function submit_check(browser, done) {
    console.log("submit check");
    browser
        /* expectation to determine if submit button is enabled */
        .evaluate(function() {
            return $('button').attr('disabled');
        })
        .then(function(submit_button) {
            console.log(submit_button);
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
