const querystring = require('querystring');

module.exports.urlgenerator = function (form) {
    var url =  querystring.stringify(
        { 
            first_name: "Andrea",
            last_name: "Vora",
            email: "andrea@gmail.com",
            phone: "1234567890",
            password: "password8",
            password_verify: "password8",
            secret_question_answer: "Reprehenderit sunt voluptatibus non repudiandae q",
            secret_question: "What was your first grade teacher's name?" 
        }); 
    return ('https://www.kidguard.com/funnel/payment/' + form + url)
}

module.exports.selectorgenerator = function (form, type) {
    var selectors = { 
        "address": "#address1", 
        "city": "#city", 
        "state": "#state", 
        "checkbox": "input[type='checkbox']", 
        "name": form["name"],
        "cardnum": form["cardnum"],
        "cvc": form["cvc"], 
        "zipcode": form["zipcode"],
        "exp": form["exp"],
        "expmonth": form["expmonth"], 
        "expyear": form["expyear"],
        "version": type
    }
    return selectors;
}

