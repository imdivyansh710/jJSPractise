#!/usr/bin/env node
//File System Organiser


let inputArr= process.argv.slice(2);
let fs=require("fs");
let path=require("path");
let helpObj=require("./commands/help");
let treeObj=require("./commands/tree");
let organiseObj=require("./commands/organise");

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

//console.log(inputArr);

let command=inputArr[0];

switch(command){

    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;

    case "organise":
        organiseObj.organiseKey(inputArr[1]);
        break;

    case "help":
        helpObj.helpKey();
        break;
    
    default:
        comsole.log(" Please 🙏 Enter the correct command");
        break;
}











