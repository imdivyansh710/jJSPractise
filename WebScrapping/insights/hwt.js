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
    let eleArr= $(".ci-team-score.ds-flex.ds-justify-between.ds-items-center.ds-text-typo-title.ds-mb-2");
    //console.log($(eleArr));
    let WTeamName="";
    for(let i=0;i<eleArr.length;i++){
        let hasClass=$(eleArr[i]).hasClass("ds-opacity-50");
        if(hasClass==false){
            let teamName= $(eleArr[i]).find(".ds-text-tight-l");
            //console.log(teamName.text());
           // console.log("honey");
           WTeamName=teamName.text().trim();
        }
        
    }
    //console.log(WTeamName);
    let innArr=$(".ds-bg-fill-content-prime.ds-rounded-lg");
     
    let htmlStr="";
    let hWTName="";
    let HW=0;
    for(let i=0;i<innArr.length;i++){
       // htmlStr+=$(innArr[i]).html();
       let teamNameEle=$(innArr[i]).find(".ds-text-tight-s.ds-font-bold.ds-uppercase");
       let teamName=teamNameEle.text();
      // console.log(teamName);
       teamName=teamName.split("INNINGS")[0];
       teamName=teamName.trim();
       //console.log(teamName);
       if(teamName!=WTeamName){
                //console.log(teamName); 
            let bowlingele=$(innArr[i]).find(".ds-w-full.ds-table.ds-table-md.ds-table-auto");
            for(let i=0;i<bowlingele.length;i++){
                let hclass=$(bowlingele[i]).hasClass("ci-scorecard-table");
                if(hclass==false){
                    //console.log($(bowlingele[i]).html());
                    let allBowlers= $(bowlingele[i]).find(" tbody tr");
                    
                    for(let j=0;j<allBowlers.length;j++){
                        let hashiddenclass=$(allBowlers[j]).hasClass("ds-hidden");
                        if(hashiddenclass==false){
                            let allColBowler=$(allBowlers[j]).find("td");
                            let playerName= $(allColBowler[0]).text();
                            let wickets= $(allColBowler[4]).text();
                            if(wickets>=HW){
                                HW=wickets;
                                hWTName=playerName;
                            }
                            //console.log(`Winning Team: ${WTeamName} player Name: ${playerName} wickets: ${wickets}`);
                        }
                        
                    }
                    

                }
            }   
       }

    }
    console.log(`Winning Team: ${WTeamName} player Name: ${hWTName} wickets: ${HW}`);
    //console.log(htmlStr);

}