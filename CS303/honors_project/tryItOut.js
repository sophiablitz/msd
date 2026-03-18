"use strict";
/*global Egg*/
/**
 * Editor and Output viewer for Egg code.
 *
 * @class TryItOut
 */
class TryItOut {

  // eslint-disable-next-line valid-jsdoc
  /**
   * Creates an instance of TryItOut of a given height and width.
   *
   * @constructor
   * @param {string} id unique identifier of new TryItOut instance
   * @param {string} [height=500px] string HTML for height property of TryItOut window
   * @param {string} [width=100%] string HTML for width property of TryItOut window
   * @memberof TryItOut
   * @returns {TryItOut} 
   */
  constructor(id, height = "500px", width = "100%") {
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
   * Toggle orientation of all editors and preview windows on page between horizontal and vertical
   * @method
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
   * Toggle theme of all editors on page between default and alternative theme
   * @method
   * @memberof TryItOut
   * @return {undefined}
   */
  onClickChangeTheme() {
    //let levels = [["tryItOut", "toolbar"], ["rotate", "theme", "run", "input"]];
    let targetClasses = [["TIO", "TIO-toolbar"], ["TIO-toolbar-btn", "TIO-input"]];
    let fromClasses = this.themeIsDefault ? this.defaultTheme : this.altTheme;
    let toClasses = this.themeIsDefault ? this.altTheme : this.defaultTheme;

    this.changeClassForElementsWithClasses(targetClasses[0], fromClasses[0], toClasses[0]);
    this.changeClassForElementsWithClasses(targetClasses[1], fromClasses[1], toClasses[1]);

    this.themeIsDefault = !this.themeIsDefault;

  }

  /** 
   * Provided an array of element class names, 
   * remove oldClass and add newClass to each element 
   * @method
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
   * @method
   * @returns {undefined}
   */
  onClickRun() {
    this.hideErrorDiv();
    this.outputTextArea.value = "";
    let program = this.inputTextArea.value;
    if (program.length > 0) {
      try {
        this.outputTextArea.value = this.egg.run(program);

      } catch (error) {
        this.errorDiv.classList.remove("TIO-hidden");
        this.errorDiv.innerHTML = "Uncaught " + error.name + ". " + error.message;
      }
    }
  }

  /**
   * Hide error div in this TryItOut
   * @method
   * @returns {undefined};
   */
  hideErrorDiv() {
    this.errorDiv.classList.add("TIO-hidden");
  }

  /**
   * Clear contents of input area, output area, and hide the error div in this TryItOut
   * @method
   * @returns {undefined};
   */
  onClickClear() {
    this.outputTextArea.value = "";
    this.inputTextArea.value = "";
    this.hideErrorDiv();
  }
  /**
   * Insert HTML for TryItOut inside an HTML element with provided ID.
   * @method
   * @param {string} outerElementId the HTML element ID for the element to contain TryItOut
   * @memberof TryItOut
   * @returns {undefined} 
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
   * Internal method to load object references to TryItOut DOM elements
   *
   * @method
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
  /**
   * Set default code in TryItOut editor
   *
   * @method
   * @param {string} code Egg code
   * @memberof TryItOut
   * @returns {undefined}
   */
  placeCode(code){
    this.onClickClear();
    this.inputTextArea.value = code;
  }
}