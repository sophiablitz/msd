let array = [-10, 10, 20,-20, -10, 30];
let returnValue = array.filter(positive);
console.log(returnValue);
console.log(array);


function positive (val){
  return val>0;
}





// function positive (anArray){
//   let newArray=[];
//   let j=0;
//   for(let i = 0; i<anArray.length; i++){
//     if (anArray[i] >0) {
//       newArray[j]=anArray[i];
//       j++;
//     }
//   }

//   return newArray;
// }


