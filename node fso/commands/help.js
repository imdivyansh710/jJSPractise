
function HelpFn(){
    console.log(`
    The command list are:-
            node main.js tree "dirPath"
            node main.js organise "dirPath"
            node main.js help
    `);

}

module.exports={
    helpKey:HelpFn
}
