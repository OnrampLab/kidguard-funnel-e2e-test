const Nightmare = require( "nightmare" );

module.exports.formABCD_input = function (browser) {
    console.log("abcd");
    browser
        .wait("input[type='checkbox']")
        .type("#address1", "123 Main Street")
        .type("#city", "Smallville")
        .type("#state", "CA")
        .click("input[type='checkbox']");
}

module.exports.formACD_input = function (browser) {
    console.log("acd");
    browser
        .type("input[name='name_on_card']", "andrea vora")
        .wait(1000)
        .type("input[name='card_number']", "4242424242424242")
        .wait(1000)
        .type("input[name='cvv']", "424")
        .type("input[name='zipcode']", "12345")
        .wait(1000)
}

module.exports.formB_input = function (browser) {
    console.log("b");
    browser
        .type("#name_on_card", "andrea vora")
        .wait(1000)
        .type("#stripe-card-number input", "4242424242424242")
        .wait(1000)
        .type("#stripe-card-cvc input", "424")
        .wait(1000)
        .type("#stripe-card-expiry input", "424")
        .wait(1000)
        .type("#stripe-postal-code", "12345")
        .wait(1000);
}


module.exports.formA_input = function (browser) {
    console.log("a");
    browser
        .type("input[name='expiration_month']", "4")
        .type("input[name='expiration_year']", "24")
        .wait(1000)

        /* expectation to determine if submit button is enabled */
        // .evaluate(function() {
        //     return document.querySelector('#links .result__a')
        // })
}

module.exports.formCD_input = function (browser) {
    console.log("cd");
    browser
        .wait(2000)
        .type("input[name='expirationMY']", "0424")
        .wait(2000)
}
