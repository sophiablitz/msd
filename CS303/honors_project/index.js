"use strict";
/*global TryItOut*/
const tio = new TryItOut("tryItOut1", "calc(100vh - 50px);", "100%");
const articles = ["intro", "basics", "print", "define", "comparisons", "math", "do", "if", "while","fun","comments","tests","documentation"];
let currentArticleIndex = 0;
let currentArticleId = articles[0];


/**
 * After Body loads, insert HTML elements for TryItOut
 *
 * @returns {undefined}
 */
function onLoad() {
  tio.buildHTML("editor");
}
/**
 *
 * @param {HTMLButtonElement} [btn] the calling button
 * @param {number} index the index of the article to show
 * @returns {undefined}
 */
function showArticle(btn, index) {
  let nextArticleId = articles[index];
  if (nextArticleId != currentArticleId) {
    // hide previous article
    document.getElementById(currentArticleId).classList.toggle("article-hidden"); //TODO: make add and remove
    // show new article
    document.getElementById(nextArticleId).classList.toggle("article-hidden");
    let buttons = document.getElementsByClassName("nav-btn");
    for (let button of buttons) {
      button.classList.remove("btn-active");
    }
    if (btn) btn.classList.toggle("btn-active");
    currentArticleId = nextArticleId;
    currentArticleIndex = index;
  }

}
/**
 * Change the visible article index by a set offset
 *
 * @param {number} offset the change for the article, 1 to increase, -1 to decrease
 * @returns {undefined}
 */
function changeArticle(offset) {
  let nextIndex = currentArticleIndex + offset;
  if (nextIndex >= articles.length) {
    showArticle(null, 0);
  } else if (nextIndex < 0) {
    showArticle(null, articles.length-1);
  } else {
    showArticle(null, nextIndex);
  } 
  window.scrollTo(0, 0);

}
/**
 * Scroll page to Try It Out panel
 * @returns {undefined}
 */
function goToTryItOut(){
  window.scrollTo(0, document.getElementById("tryItOutPanel").offsetTop);
}