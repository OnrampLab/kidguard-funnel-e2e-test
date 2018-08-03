const Nightmare = require( "nightmare" );
const querystring = require('querystring');

module.exports.formABCD_input = async function (browser, selectors, input) {
    console.log("\n Test for version " + selectors["version"]);
    await browser
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
            return submit_check(browser);
        })

}

async function submit_check(browser) {
    await browser
        /* expectation to determine if submit button is enabled */
        .evaluate(async function() {
            return $('button').attr('disabled');
        })
        .then(function(submit_button) {
            expect(submit_button).toBe(null); 
        })
}   
