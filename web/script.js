


// let c=100;
// function x(){
//     var c=30;
//    // console.log(window.c);
//     console.log(c);
//    // window.c=20;
// }
// x();
// console.log(c);
// let count=0;
// nums=[10,1,12,13];
// for(var i in nums){
//     console.log(i);
//    if(i){
//     count+=1;
//    }
// }
// console.log(count);

// for(var i of nums){
//    // console.log(i);
// }




// var x=1;
// let y=2;
// console.log(x);
// console.log(y);
// console.log(window.x);
// console.log(window.y);
// {
//     var x=1000;
//     let y=20;
//     console.log(x);
//     console.log(y);
// }
// a();
// b();
// function a(){
//     var x=10;
//     console.log(x);
// }
// function b(){
//     var x=100;
//     console.log(x);
// }


// function a(){
//     let c=10;
//     function b(){
//         console.log(c);
//     }
// }
// a();


const person={
    name: 'Honey',
    age: 22
};
const changeAge=function(x={... person}){
    x.age+=1;
};

const changeAgeAndName=function(x={... person}){
    x.age+=1;
    x.name='Divyansh';
};

changeAge(person);
changeAgeAndName();
console.log(person);