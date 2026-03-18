let array = ["apple", "ball", "cat", "dog"];
for (let index in array){
  console.log(array[i]);
}
for (let thing of array) {
  console.log(thing);
}
array.forEach( (val)=>{console.log(val)});
array.map((val) => { console.log(val) });
array.filter(val => {console.log(val); return true;});
array.reduce((out, val)=>{console.log(val); return out;},0);


let arrOfObj = [{name: "john",age: 25},{name:"sophia",age: 14}];
let newArray = arrOfObj.map((val) => { return val;});
console.log(arrOfObj);
console.log(newArray);
newArray[0].name = "tim";
console.log("Change newArray[0].name to tim");
console.log(arrOfObj);
console.log(newArray);

