const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const request=require("request");
const cheerio=require("cheerio");
const AllMatchObj=require("./AllMatch");
const fs=require("fs");
const path=require("path");

const IPLPath=path.join(__dirname,"ipl");
dirCreator(IPLPath);
request(url,cb);
function cb(error,response,html){
    if(error){
        console.log(error);
    }
    else{
        extractHTML(html);
    }
}
function extractHTML(html){
    //console.log(html);
    let $=cheerio.load(html);
    let anchorEle= $(".ds-border-t.ds-border-line.ds-text-center.ds-py-2 a");
    //console.log(anchorEle.length);
    let link= $(anchorEle[0]).attr("href");
    link="https://www.espncricinfo.com"+link
    //console.log(link);
    AllMatchObj.gAlmatches(link);

}

function dirCreator(filePath){

    if(fs.existsSync(filePath)==false){
        fs.mkdirSync(filePath);
    }

}

