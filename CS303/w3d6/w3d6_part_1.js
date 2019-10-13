"use strict";

/**
 *
 * @class FormatError
 * @extends {SyntaxError}
 */
class FormatError extends SyntaxError {
  /**
   *Creates an instance of FormatError.
   * @param {string} message error message
   * @memberof FormatError
   */
  constructor(message) {
    super(message);
    this.name = "FormatError";
  }
}
/**
 * Helper function to run exercise
 * @returns {undefined}
 */
function runInheritFromSyntaxError() {

  let err = new FormatError("formatting error");

  alert(err.message); // formatting error
  alert(err.name); // FormatError
  alert(err.stack); // stack

  alert(err instanceof FormatError); // true
  alert(err instanceof SyntaxError); // true (because inherits from SyntaxError)
}