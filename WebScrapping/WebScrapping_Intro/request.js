const cheerio= require('cheerio');
const request = require('request');
const chalk= require('chalk');
console.log("Before");
request('https://www.worldometers.info/coronavirus/', cb);
console.log("After");

function cb (error, response, body) {
    if(error){
        console.error('error:', error); // Print the error if one occurred
    }
    else {
       // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
       // console.log('body:', body); // Print the HTML for the Google homepage.
       handleHTML(body);
    }

  }
  function handleHTML(body){
    let selTool=cheerio.load(body);
    //let h1s=selTool("h1");
    //console.log(h1s);
    //console.log(h1s.length);
    let contentArr=selTool("#maincounter-wrap span"); // array
    
        let total=selTool(contentArr[0]).text();
        let deaths=selTool(contentArr[1]).text();
        let recovered=selTool(contentArr[2]).text();
    
    
    console.log( chalk.gray("Total number of cases    :   "+total));
    console.log(chalk.red("Total number of deaths   :   "+deaths));
    console.log(chalk.green("Total number of recovery :   "+recovered));

    
  }