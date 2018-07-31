const Nightmare = require( "nightmare" );

module.exports.state_select = function (browser, done, selectors) {
    console.log("state select");
    browser
        .evaluate(function() {
            console.log("HELLO");
            var state = selectors["secret_q"];
            return $(state).val()
        })
        .wait(5000)
        .then(( ) => {
            done();
        })
        .catch((err) => {
            console.error('error: ', err);
            done(err);
        });
}

module.exports.submit = function (browser, done, selectors) {
    console.log("submit func");
    browser
        .type(selectors["secret_answer"], 'blue')
        .click(selectors["password_submit"])
        .wait(5000)
        .catch(error => {
            console.error('Search failed:', error)
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
    console.log("submit check");

    browser
        .evaluate(function() {
            return location.href;
        })
        .wait(5000)
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
}