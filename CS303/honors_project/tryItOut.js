"use strict";
/*global Egg*/
/**
 *
 *
 * @class TryItOut
 */
class TryItOut {

  // eslint-disable-next-line valid-jsdoc
  /**
   * Creates an instance of TryItOut.
   *
   * @constructor
   * @param {string} id unique identifier of new TryItOut instance
   * @param {string} height string HTML for height property of TryItOut window
   * @param {string} width string HTML for width property of TryItOut window
   * @memberof TryItOut
   * @returns {TryItOut} 
   */
  constructor(id, height, width) {
    this.id = id;
    this.OUTPUT_ID = id + "_output";
    this.INPUT_ID = id + "_input";
    this.ERROR_ID = id + "_error";
    this.TRY_IT_OUT_ID = id + "_try_it_out";
    this.height = height;
    this.width = width;
    this.egg = new Egg(this.OUTPUT_ID);

    this.inputTextArea = null;
    this.outputTextArea = null;
    this.errorDiv = null;
    this.sectionIsVertical = true;
    this.themeIsDefault = true;

    this.defaultTheme = ["dark-theme-level-1", "dark-theme-level-2"];
    this.altTheme = ["light-theme-level-1", "light-theme-level-2"];
  }

  /** 
   * Change orientation of editor and preview windows from horizontal to vertical 
   * or form vertical to horizontal
   * 
   * @return {undefined}
   */
  onClickRotate() {
    let sections = document.getElementsByClassName("TIO-section");
    for (let section of sections) {
      if (this.sectionIsVertical) {
        section.style = "width: calc(100% - 10px); height: calc(50% - 30px);";
      } else {
        section.style = "width: calc(50% - 10px); height: calc(100% - 50px);";
      }
    }
    this.sectionIsVertical = !this.sectionIsVertical;

  }
  /**
   * Change theme of editor from dark to light, or light to dark
   *
   * @return {undefined}
   */
  onClickChangeTheme() {
    //let levels = [["tryItOut", "toolbar"], ["rotate", "theme", "run", "input"]];
    let targetClasses = [["TIO", "TIO-toolbar"], ["TIO-toolbar-btn", "TIO-input"]];
    let fromClasses = this.themeIsDefault ? this.defaultTheme : this.altTheme;
    let toClasses = this.themeIsDefault ? this.altTheme : this.defaultTheme;

    // this.changeClassForIds(levels[0], fromClasses[0], toClasses[0]);
    // this.changeClassForIds(levels[1], fromClasses[1], toClasses[1]);
    this.changeClassForElementsWithClasses(targetClasses[0], fromClasses[0], toClasses[0]);
    this.changeClassForElementsWithClasses(targetClasses[1], fromClasses[1], toClasses[1]);

    this.themeIsDefault = !this.themeIsDefault;

  }
  /**
   * Provided an array of element IDs, 
   * remove oldClass and add newClass to each element 
   * @param {Array} ids array of ids of HTML elements
   * @param {string} oldClass css class name to be removed
   * @param {string} newClass css class name to be added
   * @returns {undefined}
   */
  changeClassForIds(ids, oldClass, newClass) {
    for (let i = 0; i < ids.length; i++) {
      let el = document.getElementById(ids[i]);
      el.classList.remove(oldClass);
      el.classList.add(newClass);
    }
  }

  /** 
   * Provided an array of element class names, 
   * remove oldClass and add newClass to each element 
   * @param {Array} withClasses array of classes of HTML elements to change
   * @param {string} oldClass css class name to be removed
   * @param {string} newClass css class name to be added
   * @returns {undefined}
   */
  changeClassForElementsWithClasses(withClasses, oldClass, newClass) {
    for (let i = 0; i < withClasses.length; i++) {
      let elements = document.getElementsByClassName(withClasses[i]);
      for (let el of elements) {
        el.classList.remove(oldClass);
        el.classList.add(newClass);
      }
    }
  }
  /**
   * Run the code in the onscreen input textarea through Egg. 
   * Display errors in error div.
   * @returns {undefined}
   */
  onClickRun() {
    this.hideErrorDiv();
    this.outputTextArea.value = "";
    let program = this.inputTextArea.value;
    if (program.length > 0) {
      try {
        this.egg.run(program);
      } catch (error) {
        this.errorDiv.classList.remove("TIO-hidden");
        this.errorDiv.innerHTML = "Uncaught " + error.name + ". " + error.message;
      }
    }
  }

  /**
   * Hide error div
   * @returns {undefined};
   */
  hideErrorDiv() {
    this.errorDiv.classList.add("TIO-hidden");
  }

  /**
   * Clear contents of input area, output area, and hide the error div
   * @returns {undefined};
   */
  onClickClear() {
    this.outputTextArea.value = "";
    this.inputTextArea.value = "";
    this.hideErrorDiv();
  }
  /**
   *
   *
   * @memberof TryItOut
   * @returns {string} HTML for Try It Out box
   */
  buildHTML(outerElementId) {

    let html = `   
    <div id="${this.TRY_IT_OUT_ID}" class="TIO" style="height:${this.height}; width:${this.width};">
      <div id="" class="TIO-toolbar dark-theme-level-1">
        <button id="${this.id}_rotate" class="TIO-toolbar-btn TIO-rotate dark-theme-level-2" >Rotate</button>
        <button id="${this.id}_theme" class="TIO-toolbar-btn TIO-theme dark-theme-level-2" >Change Theme</button>
        <button id="${this.id}_run" class="TIO-toolbar-btn TIO-run dark-theme-level-2" >Run >></button>
        <button id="${this.id}_clear" class="TIO-toolbar-btn TIO-clear dark-theme-level-2" >Clear</button>
      </div>

      <div class="TIO-demo">
        <div class="TIO-section">
          <textarea id="${this.INPUT_ID}" class="TIO-textarea TIO-input dark-theme-level-2">print("Hello world")</textarea>
        </div>
        <div class="TIO-section">
          <textarea id="${this.OUTPUT_ID}" class="TIO-textarea TIO-output" readonly></textarea>
        </div>
        <div id="${this.ERROR_ID}" class="TIO-hidden TIO-error"></div>
      </div>

    </div>`;
    document.getElementById(outerElementId).innerHTML = html;
    this.loadHTML();
  }
  /**
    *
    *
    * @memberof TryItOut
    * @returns {undefined}
    */
  loadHTML() {
    this.inputTextArea = document.getElementById(this.INPUT_ID);
    this.outputTextArea = document.getElementById(this.OUTPUT_ID);
    this.errorDiv = document.getElementById(this.ERROR_ID);
    document.getElementById(this.id + "_rotate").onclick = () => { this.onClickRotate(); };
    document.getElementById(this.id + "_theme").onclick = () => { this.onClickChangeTheme(); };
    document.getElementById(this.id + "_run").onclick = () => { this.onClickRun(); };
    document.getElementById(this.id + "_clear").onclick = () => { this.onClickClear(); };
  }
}