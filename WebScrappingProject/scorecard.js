//const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-mumbai-indians-10th-match-1216547/full-scorecard";


const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
const path=require("path");
const xlsx=require("xlsx");

function processScorecard(url){
    request(url,cb);
}


function cb(error,response,html){
    if(error){
        console.log(error);
    }
    else{
        extractMatchDetails(html);
    }
}
function extractMatchDetails(html){
    let $ =cheerio.load(html);
    let descele=$(".ds-grow>.ds-text-tight-m.ds-font-regular.ds-text-ui-typo-mid"); // venue date
    let result=$(".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title span"); //result
    let stringArr=descele.text().split(",");
    let venue=stringArr[1].trim();
    let date=stringArr[2].trim();
    let res=result.text();

    let innings=$(".ds-bg-fill-content-prime.ds-rounded-lg");
    let htmlString="";
    for(let i=0;i<innings.length;i++){
        //htmlString+=$(innings[i]).html();
        let teamName=$(innings[i]).find(".ds-text-tight-s.ds-font-bold.ds-uppercase").text();
        teamName=teamName.split("INNINGS")[0].trim();
        let opponentIdx= i==0 ?1: 0;
        let opponentTeam=$(innings[opponentIdx]).find(".ds-text-tight-s.ds-font-bold.ds-uppercase").text();
        opponentTeam=opponentTeam.split("INNINGS")[0].trim();
        console.log(`${venue} ${date} ${teamName} ${opponentTeam} ${res}`);

        let cInning=$(innings[i]);
        let allrows=cInning.find(".ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table tbody tr");
        for(let j=0;j<allrows.length;j++){
            //console.log($(allrows[j]).text());
            let hiddenClass=$(allrows[j]).hasClass("ds-hidden");
            if(hiddenClass==false){
                //console.log($(allrows[j]).text());
                let allCols=$(allrows[j]).find("td");
                if(allCols.length==8){
                   let playerName= $(allCols[0]).text().trim();
                   let runs= $(allCols[2]).text().trim();
                   let balls= $(allCols[3]).text().trim();
                   let fours= $(allCols[5]).text().trim();
                   let sixes= $(allCols[6]).text().trim();
                   let sr= $(allCols[7]).text().trim();
                   console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${sr}`);
                   processPlayer(teamName,playerName,runs,balls,fours,sixes,sr,opponentTeam,venue,date,res);

                }
            }
            

            
        }

        //console.log(`${venue} ${date} ${teamName} ${opponentTeam} ${res}`);
    }

    console.log("```````````````````````````");
    //console.log(htmlString);
    
    
}

function processPlayer(teamName,playerName,runs,balls,fours,sixes,sr,opponentTeam,venue,date,res){
    let teamPath=path.join(__dirname,"ipl",teamName);
    dirCreator(teamPath);
    let filePath=path.join(teamPath,playerName + ".xlsx");
    let content=excelReader(filePath,playerName);
    let playerObj={
        teamName,
        playerName,
        runs,
        balls,
        fours,
        sixes,
        sr,
        opponentTeam,
        venue,
        date,
        res
    }
    content.push(playerObj);
    excelWriter(filePath,content,playerName)

}


function dirCreator(filePath){

    if(fs.existsSync(filePath)==false){
        fs.mkdirSync(filePath);
    }

}

function excelWriter(filePath,jsonData,sheetName){
    let newWB=xlsx.utils.book_new();
    let newWS=xlsx.utils.json_to_sheet(jsonData);
    xlsx.utils.book_append_sheet(newWB,newWS,sheetName);
    xlsx.writeFile(newWB,filePath);



}

function excelReader(filePath,sheetName){
    if(fs.existsSync(filePath)==false){
        return [];
    }
    let wb=xlsx.readFile(filePath);
    let excelData=wb.Sheets[sheetName];
    let ans=xlsx.utils.sheet_to_json(excelData);
    return ans;

}






module.exports={
    sc:processScorecard
}