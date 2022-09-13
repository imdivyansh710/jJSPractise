const request=require("request");
const cheerio=require("cheerio");
const scoreCardObj=require("./scorecard");

function getAllMatchLinks(url){
    request(url,function(error,response,html){
        if(error){
            console.log(error);
        }
        else{
            extractAllLinks(html);
        }
    });
    }
    function extractAllLinks(html){
        let $=cheerio.load(html);
        let link =$(".ds-p-0 .ds-p-4 .ds-flex .ds-grow.ds-px-4.ds-border-r.ds-border-line-default-translucent>a");
        //console.log(link.length);
        for(let i=0;i<link.length;i++){
            let halflink=$(link[i]).attr("href");
            let fulllink="https://www.espncricinfo.com"+halflink;
            console.log(fulllink);
            scoreCardObj.sc(fulllink);
        }
    
        
    }
    
module.exports ={
    gAlmatches:getAllMatchLinks
};    