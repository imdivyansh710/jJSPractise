const request=require('request');
const cheerio=require('cheerio');

console.log("Before");
request('https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/rajasthan-royals-vs-chennai-super-kings-68th-match-1304114/full-scorecard', cb);

function cb (error, response, html) {
    if(error){
        console.error('error:', error); // Print the error if one occurred
    }
    else{
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('html:', html); // Print the HTML for the Google homepage.
        HTMLHandler(html);
    }
  }
  function HTMLHandler(html){
    let selTool=cheerio.load(html);
    let contentArr=selTool(`.ds-mr-1.ds-break-words [href="/player/ravichandran-ashwin-26421"]`);
    console.log(contentArr.length);
    console.log("Player of the match ", selTool(contentArr[0]).text());

  }