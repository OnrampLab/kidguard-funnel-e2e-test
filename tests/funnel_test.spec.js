// go to home page, click free trial
// detect url, call corresponding funnel form test
//     if passed, detect which payment form, call corresponding payment test

"use strict";
const { execFile } = require('child_process');
const querystring = require('querystring');

const Nightmare = require( "nightmare" ),
      expect = require( "chai" ).expect,
      BASE_URL = "https://www.kidguard.com/",
      onError = ( err ) => {
        console.error( "Test-runner failed:", err );
      },
      browser = new Nightmare({
          height: 768,
          width: 1024,
          show: true,
          typeInterval: 20,
          pollInterval: 5000,
          waitTimeout: 30000,
      });


console.log("starting");

// describe("A spec to test Kidguard funnel form", function() {
//     beforeEach( function(done) {

        browser
            .goto("https://www.kidguard.com/")
            .wait('#headerNav-cta span')
            .click('#headerNav-cta span')
            .wait('#first_name')

            .evaluate(function() {
                console.log("location" + location.href)
                return location.href
            })
            .end()
            .then(function(url) {
                // console.log(url.split());
                var form = url.slice(37, 40);
                var version = url.slice(41, 42);
                var path = "./login/" + form + "/signup_" + form[2] + version + ".spec.js";
                console.log("path: " + path);
                console.log(form+version);
                const child = execFile('node', [path], (error, stdout, stderr) => {
                    if (error) {
                        throw error;
                    }
                    console.log(stdout);
                });
            })
            .catch(function(error) {
                console.error('Funnel failed:', error)
            })
            



    



