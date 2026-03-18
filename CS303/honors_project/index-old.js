"use strict";
/*global Egg*/

const OUTPUT_ID = "output";
const INPUT_ID = "input";

let inputTextArea;
let outputTextArea;
let errorDiv;

let egg = new Egg(OUTPUT_ID);
let sectionIsVertical = true;
let themeIsDark = true;

/**
 * Set global references to input, output, and error divs.
 * @returns {undefined}
 */
function onLoad(){
  inputTextArea = document.getElementById(INPUT_ID);
  outputTextArea = document.getElementById(OUTPUT_ID);
  errorDiv = document.getElementById("error");
}
/** 
 * Change orientation of editor and preview windows from horizontal to vertical 
 * or form vertical to horizontal
 * 
 * @return {undefined}
 */
function onClickRotate() {
  let sections = document.getElementsByClassName("section");
  for (let section of sections) {
    if (sectionIsVertical) {
      section.style = "width: calc(100% - 10px); height: calc(50% - 30px);";
    } else {
      section.style = "width: calc(50% - 10px); height: calc(100% - 50px);";
    }
  }
  sectionIsVertical = !sectionIsVertical;

}
/**
 * Change theme of editor from dark to light, or light to dark
 *
 * @return {undefined}
 */
function onClickChangeTheme() {
  let dark = ["dark-theme-level-1", "dark-theme-level-2"];
  let light = ["light-theme-level-1", "light-theme-level-2"];
  let levels = [["tryItOut", "toolbar", "egg"], ["rotate", "theme", "run", "input"]];
  let fromClasses = themeIsDark ? dark : light;
  let toClasses = themeIsDark ? light : dark;

  changeClassForIds(levels[0], fromClasses[0], toClasses[0]);
  changeClassForIds(levels[1], fromClasses[1], toClasses[1]);

  themeIsDark = !themeIsDark;

}
/**
 * Provided an array of element IDs, 
 * remove oldClass and add newClass to each element 
 * @param {Array} ids array of ids of HTML elements
 * @param {string} oldClass css class name to be removed
 * @param {string} newClass css class name to be added
 * @returns {undefined}
 */
function changeClassForIds(ids, oldClass, newClass) {
  for (let i = 0; i < ids.length; i++) {
    let el = document.getElementById(ids[i]);
    el.classList.remove(oldClass);
    el.classList.add(newClass);
  }
}
/**
 * Run the code in the onscreen input textarea through Egg. 
 * Display errors in error div.
 * @returns {undefined}
 */
function onClickRun() {
  // let errorDiv = document.getElementById("error");
  hideErrorDiv();
  outputTextArea.value = "";
  let program = inputTextArea.value;
  if (program.length > 0) {
    try {
      egg.run(program);
    } catch (error) {
      errorDiv.classList.remove("hidden");
      errorDiv.innerHTML = "Uncaught " + error.name + ". " + error.message;
    }
  }
}

/**
 * Hide error div
 * @returns {undefined};
 */
function hideErrorDiv(){
  errorDiv.classList.add("hidden");
}

/**
 * Clear contents of input area, output area, and hide the error div
 * @returns {undefined};
 */
function onClickClear(){
  outputTextArea.value = "";
  inputTextArea.value = "";
  hideErrorDiv();
}