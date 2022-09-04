let fs=require("fs");
let path=require("path");
function orgaiseFn(dirPath){
    //console.log("Organize function implemented for", dirPath);
    let destPath;
    if(dirPath==undefined){
        destPath=process.cwd();
       // console.log("kindly enter the path");
        return;
    }
    else{
        let doesExist=fs.existsSync(dirPath);
        if(doesExist){
            destPath=path.join(dirPath,"organised_files");
            if(fs.existsSync(destPath==false)){
                fs.mkdirSync(destPath);
            }
        }
        else{
            console.log("kindly enter the correct path");
            return;  
        }

    }
    organiseHelper(dirPath,destPath);

}

function organiseHelper(src, dest){

    let childNames=fs.readdirSync(src);
   // console.log(childNames);
   for(let i=0;i<childNames.length;i++){
    let childAddress=path.join(src,childNames[i]);
    let isFile=fs.lstatSync(childAddress).isFile();
    if(isFile){
       // console.log(childNames[i],"children is a file");
       let category=getCategory(childNames[i]);
       console.log(childNames[i], " belongs to ",category);
       sendFiles(childAddress,dest,category);

    }
   }

}

function getCategory(name){
   let ext= path.extname(name);
   //console.log(ext);
   ext= ext.slice(1);
   for(let type in types){
    let cTypeArray=types[type];
    for(let i=0;i<cTypeArray.length;i++){
        if(cTypeArray[i]==ext){
            return type;
        }
    }
   }
   return "others";

}

function sendFiles(srcFile,dest,category){
    //console.log(srcFile,dest,category);
    let categoryPath=path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }

    let filePath=path.basename(srcFile);
    let destFilePath=path.join(categoryPath,filePath);
    fs.copyFileSync(srcFile,destFilePath);
    fs.unlinkSync(srcFile);
    console.log(filePath, " copied to ", category);
}


module.exports={
    organiseKey:orgaiseFn
}