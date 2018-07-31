const Nightmare = require( "nightmare" );

module.exports.state_select = function (browser, selectors) {
    browser
        .evaluate(function() {
            console.log("HELLO");
            var state = selectors["secret_q"];
            return $(state).val()
        })
        .wait(5000)
}

module.exports.submit = function (browser, selectors) {
    browser
        .type(selectors['secret_answer'], 'blue')
        .click(selectors['password_submit'])
        .wait(5000)
        .catch(error => {
            console.error('Search failed:', error)
        });

    submit_check(browser);

}

async function submit_check(browser) {

// module.exports.submit_check = function (browser) {
    console.log("submit check");

    await browser
        .evaluate(function() {
            return location.href;
        })
        .wait(5000)
        .then(async function(url) {
            console.log("within expect");
            await expect(url.includes('payment')).to.equal(true);
        });
}