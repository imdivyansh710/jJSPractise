const request=require("request");
const cheerio=require("cheerio");
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";
request(url,cb);
function cb(error , response ,html){
    if(error){
        console.log(error);
    }
    else{
        //console.log(response);
        extractHTML(html);
        
    }

}

function extractHTML(html){
    let $=cheerio.load(html);
        let elementArr= $(".ds-ml-4 .ci-html-content");

        let text= $(elementArr[0]).text();
        let htmlContent= $(elementArr[0]).html();
        console.log("text  ",text);
        console.log("html  ",htmlContent);
}