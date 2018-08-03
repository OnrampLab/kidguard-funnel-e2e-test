const Nightmare = require( "nightmare" );
const { execFile } = require('child_process');


var payment = require('../payment/payment.library.js');
var helper = require('../payment/formhelper.js');
const payment_a = require('../payment/001/a/a_selectors.json')
const payment_b = require('../payment/001/b/b_selectors.json')
const payment_c = require('../payment/001/c/c_selectors.json')
const payment_d = require('../payment/001/d/d_selectors.json')
var input = require('../payment/data.json');


module.exports.name = async function (base) {
    await base.page
        .wait(base.selectors.name)
        .type(base.selectors.name, 'Aahad')
        .type(base.selectors.last, 'Patel')
        .type(base.selectors.email, 'aahad.patel786@gmail.com')
        .click(base.selectors['password_submit'])

}

module.exports.details = async function(base) {
    await base.page
        .wait(base.selectors.worry)
        .click(base.selectors.worry)
        .click(base.selectors.relation);
}

module.exports.phone = async function (base) {
    await base.page
        .wait(base.selectors.phone)
        .type(base.selectors.phone, '4692586923');
}



module.exports.location = async function (base) {
    await base.page
        .type(base.selectors.zipcode, '75074')
        .wait(5000)
        .evaluate(function(texas) {
            return $(texas).val();
        }, base.selectors.texas)
        .then( async function(texas) {
            await base.page
                .select(base.selectors.state, texas)
        }); 
}

module.exports.payment = async function (base) {
    await base.page
        .type(base.selectors.card, '4242424242424242')
        .type(base.selectors.cvv, '123')
        .type(base.selectors.expmonth, '08')
        .type(base.selectors.expyear, '2020')
        .type(base.selectors.address, '3454 keelung rd.')
        .type(base.selectors.city, 'Taipei')
}

module.exports.password = async function(base) {
    var url = "";
    await base.page
        .wait(base.selectors.password)
        .type(base.selectors.password, 'password8')
        .type(base.selectors.verify, 'password8')
        .type(base.selectors.secret_answer, 'blue')

        .evaluate(function(secret_q) {
            return $(secret_q).val();
        }, base.selectors.secret_q)
        .then(async function(question) {
            url = await base.page
                .select('#secret_question', question)
                .click(base.selectors['password_submit'])
                .wait(10000)
                .evaluate(function() {
                    return location.href;
                });
        });
        
    console.log(url);
    await check_and_continue(url, base.page);
}



/*
    This function checks to make sure all the login information is inputted. Then, calls the 
    corresponding payment test to test the payment portion of the form
*/

async function check_and_continue(url, browser) { 
    expect(url.includes('payment')).toBe(true);
    var payment_selectors;

    if (url.includes('011/a')) {
        console.log('011/a');
        payment_selectors = helper.selectorgenerator(payment_a, '011/a');

    } else if (url.includes('011/b')) {
        console.log('011/b');
        payment_selectors = helper.selectorgenerator(payment_b, '011/b');
        console.log(payment_selectors);
    } else if (url.includes('011/c')) {
        console.log("'011/c'");
        payment_selectors = helper.selectorgenerator(payment_c, '011/c');
    } else if (url.includes('011/d')) {
        console.log('011/d');
        payment_selectors = helper.selectorgenerator(payment_d, '011/c');
    }


    await payment.formABCD_input(browser, payment_selectors, input);    
}

