function sum(array) {
  let len = array.length;
  if (len <= 0) {
    // console.log("empty array.");
    return 0;
  } else if (len == 1) {
    // console.log(array[0]);
    return array[0];
  } else {
    // console.log(array[len - 1]);
    return array[len - 1] + sum(array.slice(0, len - 1));
  }
}
console.log("sum is: " + sum([0, 1, 2, 3]));
console.log("sum is: " + sum([0, 1]));
console.log("sum is: " + sum([]));

function min(array){
  let other = array[0];
  for(let i = 0;i<array.length;i++){
    if (array[i]>other){
      other = array[i];
    }
  }
  return other;
}
console.log("min is: " + min([0, 1, 2, 3]));
console.log("min is: " + min([8, 0, 1]));
console.log("min is: " + min([4]));