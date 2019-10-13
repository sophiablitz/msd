"use strict";
let sectionIsVertical = true;
let themeIsDark = true;
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
      section.style = "width: calc(100vw - 15px); height: 40vh;";
    } else {
      section.style = "width: calc(50vw - 20px); height: 80vh;";
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
  let levels = [["tryItOut", "toolbar"], ["rotate", "theme", "save", "run", "input"]];
  let fromClasses = themeIsDark ? dark : light;
  let toClasses = themeIsDark ? light : dark;

  changeClassForElementIds(levels[0], fromClasses[0], toClasses[0]);
  changeClassForElementIds(levels[1], fromClasses[1], toClasses[1]);

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
function changeClassForElementIds(ids, oldClass, newClass) {
  for (let i = 0; i < ids.length; i++) {
    let el = document.getElementById(ids[i]);
    el.classList.remove(oldClass);
    el.classList.add(newClass);
  }
}
function onClickSave() {

}
function onClickRun() {

}