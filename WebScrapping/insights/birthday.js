const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
const request=require("request");
const cheerio=require("cheerio");
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
    let $= cheerio.load(html);
    let innArr=$(".ds-bg-fill-content-prime.ds-rounded-lg");
     
    for(let i=0;i<innArr.length;i++){
       // htmlStr+=$(innArr[i]).html();
       let teamNameEle=$(innArr[i]).find(".ds-text-tight-s.ds-font-bold.ds-uppercase");
       let teamName=teamNameEle.text();
      // console.log(teamName);
       teamName=teamName.split("INNINGS")[0];
       teamName=teamName.trim();
       //console.log(teamName);
                //console.log(teamName); 
            let batsmanele=$(innArr[i]).find(".ds-w-full.ds-table.ds-table-md.ds-table-auto");
            for(let i=0;i<batsmanele.length;i++){
                let hclass=$(batsmanele[i]).hasClass("ci-scorecard-table");
                if(hclass==true){
                    //console.log($(bowlingele[i]).html());
                    let allBatsman= $(batsmanele[i]).find("tbody tr");
                    for(let j=0;j<allBatsman.length;j++){
                        let hashiddenclass=$(allBatsman[j]).hasClass("ds-hidden");
                        if(hashiddenclass==false){
                            let allColBatsman=$(allBatsman[j]).find("td");
                            if(allColBatsman.length>4){
                                let playerName=$(allColBatsman[0]).text();
                                let href= $(allColBatsman[0]).find("a").attr("href");
                                let wickets= $(allColBatsman[4]).text();
                                //console.log(playerName.html());
                                let fullLink="https://www.espncricinfo.com"+href;
                                //console.log(fullLink);
                                goBirthdayPage(playerName,fullLink,teamName);
                                
                               // console.log(`team name ${teamName}player Name: ${playerName}`);

                            }
                           
                        }
                        
                    }
                    

                }
            }   
       

    }
    //console.log(`Winning Team: ${WTeamName} player Name: ${hWTName} wickets: ${HW}`);
    //console.log(htmlStr);

}
function goBirthdayPage(playerName,url,teamName){
    //console.log(url);
    request(url,findBirthday);
    function findBirthday(error , response ,html){
        if(error){
            console.log(error);
        }
        else{
            //console.log(response);
            extractBirthday(html,playerName,teamName);
        }
    
    }
}

function extractBirthday(html,playerName,teamName){
    let $=cheerio.load(html);
    let descArr=$(".ds-text-title-s h5");
    let bd=$(descArr[1]).text();
    
        console.log(`player name ${playerName} playes for ${teamName} was born on ${bd}`);
    

    
}