const querystring = require('querystring');

module.exports.urlgenerator = function (version, first, last, email, phone, pswd, pswd_verify, secret_answer, secret_q) {
    // 011/a?first_name=Vernon&last_name=Swanson&email=zinoto@mailinator.com&phone=+921-79-3649008&site=cellmon&log_id=12574785&password=Pa$$w0rd!&password_verify=Pa$$w0rd!&secret_question_answer=&secret_question=%3F
    // console.log(url);
    var url =  querystring.stringify(
        { 
            // '': '011/a?',
            first_name: first,
            last_name: last,
            email: email,
            phone: phone,
            password: pswd,
            password_verify: pswd_verify,
            secret_question_answer: secret_answer,
            secret_question: secret_q 
        });  
    return ('https://www.kidguard.com/funnel/payment/' + version + url)
}

module.exports.selectorgenerator = function () {

}

