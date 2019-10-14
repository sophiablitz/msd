"use strict";
/*global TryItOut*/
// const tio = new TryItOut("tryItOut1","calc(100vh - 50px);","100%");
const tio2 = new TryItOut("tryItOut2", "25vh;", "100%");
const tio3 = new TryItOut("tryItOut3", "25vh;", "100%");

/**
 *
 *
 */
function onLoad(){
  tio2.buildHTML("putItHere");
  tio3.buildHTML("putItHere2");
}