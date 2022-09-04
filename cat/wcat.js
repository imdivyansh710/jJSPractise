#!/usr/bin/env node
let inputArr=process.argv.slice(2);
const { log } = require("console");
let fs=require("fs");
let path=require("path");
const { fileURLToPath } = require("url");
let optionArr=[];
let fileArr=[];


for(let i=0;i<inputArr.length;i++){
    if(inputArr[i].charAt(0)=='-'){
        optionArr.push(inputArr[i]);
    }
    else{
        fileArr.push(inputArr[i])
    }
}

// edge case
//option check
let isBothPresent=optionArr.includes("-b") && optionArr.includes("-n");
if(isBothPresent){
    console.log("either enter -n or -b");
    return;
}

//existence
for(let i=0;i<fileArr.length;i++){
    doesExist=fs.existsSync(fileArr[i]);
    if(doesExist==false){
        console.log(`${fileArr[i]} file does not exist`);
        return;
    }
}



//console.log(optionArr);
//console.log(fileArr);


//read
let content="";
for(let i=0;i<fileArr.length;i++){
    let file=fileArr[i];
    let bufferContent=fs.readFileSync(file);
    content+=bufferContent+"\r\n";
}
//console.log(content);
 let contentArr=content.split("\r\n");
 //console.log(contentArr);


 //-s
 let isSPresent=optionArr.includes("-s");
 if(isSPresent==true){
    for(let i=1;i<=contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i]=null;
        }
        else if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }

    let tempArr=[];
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr=tempArr;
 }
 //console.log(contentArr.join("\n"));


 //n
let isNPresent=optionArr.includes("-n");
if(isNPresent){
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]= `${i+1} ${contentArr[i]}`;
    }
    //console.log(contentArr.join("\n"));
}

//b
let isBPresent=optionArr.includes("-b");
if(isBPresent){
    let counter=1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!="" && contentArr[i]!=null){
        contentArr[i]= `${counter} ${contentArr[i]}`;
        counter++;
        }
    }
}

console.log(contentArr.join("\n"));





































//console.log(inputArr);
// let command=inputArr[0];
// switch(command){
//     case "wcat":
//         //console.log("wcat cmd");
//         copycontent(inputArr.slice(1));
//         break;
    
//     default:
//         console.log("Please 🙏🙏 enter the correct command");
//         break;
// }


// function copycontent(fileName){
//     for(let i=0;i<fileName.length;i++){
//         let filePath=path.join(process.cwd(),fileName[i])

//         let doExist=fs.existsSync(filePath);
//         if(doExist==false){
//             fs.writeFileSync(filePath,"");
//         }
//         else{
//          let fileCont=fs.readFileSync(filePath);
//             console.log(""+fileCont);
//         }

//     }
    
// }
