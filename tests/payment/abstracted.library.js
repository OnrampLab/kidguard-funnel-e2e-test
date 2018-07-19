const Nightmare = require( "nightmare" );

module.exports.formABCD_input = function (browser, done) {
    console.log("abcd");
    browser
        .wait("input[type='checkbox']")
        .type("#address1", "123 Main Street")
        .type("#city", "Smallville")
        .type("#state", "CA")
        .click("input[type='checkbox']")
        .evaluate(function () {
            console.log("fetching url");
            return location.href;
        })
        .then(function (url) {
            
            console.log("determining url");
            if (url.includes("011/b?")) {
                formB_input(browser, done);
            }  else {
                formACD_input(browser, url, done);
            }
        });
        // .catch((err) => {
        //     console.error('error: ', err);
        //     done(err);
        // });
}

// module.exports.formB_input = function (browser, done) {
function formB_input(browser, done) {
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
            .wait(1000)
    
            .then(( ) => {
                submit_check(browser, done)
            });
    
            
            
}

// module.exports.formACD_input = function (browser) {
function formACD_input(browser, url, done) {
    console.log("acd");
    browser
        .type("input[name='name_on_card']", "andrea vora")
        .wait(1000)
        .type("input[name='card_number']", "4242424242424242")
        .wait(1000)
        .type("input[name='cvv']", "424")
        .type("input[name='zipcode']", "12345")
        .wait(1000);

    if (url.includes("a?")) {
        formA_input(browser, done);
    } else {
        formCD_input(browser, done);
    }
        
}




// module.exports.formA_input = function (browser, done) {
function formA_input(browser, done) {
    console.log("a");
    browser
        .type("input[name='expiration_month']", "4")
        .type("input[name='expiration_year']", "24")
        .wait(1000)

        .then(( ) => {
            submit_check(browser, done)
        });
}

// module.exports.formCD_input = function (browser, done) {
function formCD_input(browser, done) {
    console.log("cd");
    browser
        .wait(2000)
        .type("input[name='expirationMY']", "0424")
        .wait(2000)

        .then(( ) => {
            submit_check(browser, done)
        });
}

// module.exports.submit_check = function (browser, done) {
function submit_check(browser, done) {
    console.log("submit check");
    browser
        /* expectation to determine if submit button is enabled */
        .evaluate(function() {
            return $('button').attr('disabled');
        })
        .then(function(submit_button) {
            console.log(submit_button);
            // expect(submit_button).not.toContain('disabled = "disabled"');
            // expect(submit_button).toContain("disabled");
            // expect(submit_button.length).toBe(3);
            expect(submit_button).toBe(null);
            
        })

        .then(( ) => {
            // .wait(10000)
            console.log("finished")
            done();
        })
        .catch((err) => {
            console.error('error: ', err);
            done(err);
        });
}   
