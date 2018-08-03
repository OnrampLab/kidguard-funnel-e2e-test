const Nightmare = require( "nightmare" );

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
    submit_check(url);
        
}




function submit_check(url) {
    expect(url.includes('payment')).toBe(true);   
}
