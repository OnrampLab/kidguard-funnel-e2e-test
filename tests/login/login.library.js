const Nightmare = require( "nightmare" );

module.exports.name = async function (base) {
    console.log("question select " + base.selectors.name);
    await base.page
        // .goto(BASE_URL)
        .wait(base.selectors.name)
        .type(base.selectors.name, 'Aahad')
        .type(base.selectors.last, 'Patel')
        .type(base.selectors.email, 'aahad.patel786@gmail.com')

}

module.exports.details = function(base) {
    console.log("extra details");
    base.page
        .wait('.container')
        .click('input#most_worried_about_answer_0')
        .click('input#relation_1');
}

module.exports.phone = function (base) {
    console.log("phone " + base.selectors.phone);
    base.page
        .wait(base.selectors.phone)
        .type('input[name="phone"]', '4692586923');
    console.log("got yo numba");
}



module.exports.location = async function (base) {
    console.log("SEND ME. YOUR LOCATION. " + base.selectors.zipcode);
    await base.page
        .type('input[id="zipcode"]', '75074')
        .evaluate(function(zipcode) {
            console.log("within evaluate location", zipcode);
            return $('select[id="state"] option:contains("TX")').val();
        }, base.selectors.zipcode)
        .then( async function(state) {
            console.log("location then" + state);
            await base.page
                .select('#state', state)
                .wait('#zipcode')
                .type('input[id="zipcode"]', '75074')
        }); 
}



module.exports.password = function(base) {
    console.log("password + verify");
    const url = base.page
        .click(base.selectors['password_submit'])
        .wait('#password')
        .type('input[id="password"]', 'password8')
        .type('input[id="password_verify"]', 'password8')
        .type('input[id="secret_question_answer"]', 'blue')

        .evaluate(function() {
            console.log("HELLO");
            return $('select[id="secret_question"] option:contains("color")').val();
        })
        .then(function(question) {
                return browser.select('#secret_question', question);
        })
        .click(selectors['password_submit'])
        .evaluate(function() {
            return location.href;
        })
    submit_check(url);
        
}




function submit_check(url) {
    console.log(url);
    expect(url.includes('payment')).to.equal(true);
        
}
