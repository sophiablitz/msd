/*eslint-disable*/
// Project defined at https://eloquentjavascript.net/12_language.html
// DONE: put all egg code into an egg object (namespace).
// TODO: complete exercises named as todo
//        - DONE arrays
//        - DONE SkipSpace includes comments
//        - TODO explain closures
//        - DONE implement set
// TODO: Write mocha tests in test.js
// TODO: Complete jsdoc documentation (see namespace documentation in assignment)
// TODO: Create jsdoc webpage
// DONE: Create Try-it-now style input and output box in index.html
// DONE: change print implementation to print to the screen

class Egg {

  constructor(outputId) {
    this.outputId = outputId;

    /*************************
     * TOP SCOPE INITIALIZED *
     *************************/
    this.topScope = Object.create(null);

    this.topScope.true = true;
    this.topScope.false = false;
    // DONE: implement arrays
    this.topScope.array = (...args) => {
      return args;
    };

    this.topScope.length = (arrayName) => arrayName.length;

    this.topScope.element = (arrayName, n) => arrayName[n];

    for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
      this.topScope[op] = Function("a, b", `return a ${op} b;`);
    }
    this.topScope.print = value => {
      let el = document.getElementById(this.outputId);
      el.value += value + "\n";
      // console.log(value);
      return value;
    };

    /*****************************
     * SPECIAL FORMS INITIALIZED *
     *****************************/
    this.specialForms = Object.create(null);
    this.specialForms.do = (args, scope) => {
      let value = false;
      for (let arg of args) {
        value = this.evaluate(arg, scope);
      }
      return value;
    };
    this.specialForms.if = (args, scope) => {
      if (args.length != 3) {
        throw new SyntaxError("Wrong number of args to if");
      } else if (this.evaluate(args[0], scope) !== false) {
        return this.evaluate(args[1], scope);
      } else {
        return this.evaluate(args[2], scope);
      }
    };
    this.specialForms.while = (args, scope) => {
      if (args.length != 2) {
        throw new SyntaxError("Wrong number of args to while");
      }
      while (this.evaluate(args[0], scope) !== false) {
        this.evaluate(args[1], scope);
      }

      // Since undefined does not exist in Egg, we return false,
      // for lack of a meaningful result.
      return false;
    };
    this.specialForms.define = (args, scope) => {
      if (args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Incorrect use of define");
      }
      let value = this.evaluate(args[1], scope);
      scope[args[0].name] = value;
      return value;
    };
    /* TODO: add form 'set', like 'define', but only sets existing values.
    If no binding found, throw a 'ReferenceError'.
    See 'Fixing scope'.*/
    this.specialForms.set = (args, scope) => {
      if (args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Incorrect use of set");
      }
      let value = this.evaluate(args[1], scope);
      let found;
      try {
        found = Object.prototype.hasOwnProperty.call(scope, args[0].name);
        while (!found) {
          scope = Object.getPrototypeOf(scope);
          found = Object.prototype.hasOwnProperty.call(scope, args[0].name);
        }
      }
      catch (e) {
        throw new ReferenceError("The variable is not defined.");
      }
      scope[args[0].name] = value;
      return value;
      // Your code here.
    };
    /********************************************************************************************************
     * TODO: The way we have defined fun allows functions in Egg to reference the surrounding scope,
     * allowing the function’s body to use local values that were visible at the time the function was defined, 
     * just like JavaScript functions do.
     * 
     * The following program illustrates this: function f returns a function that adds its argument 
     * to f’s argument, meaning that it needs access to the local scope inside f to be able to use binding a.
     * 
     * Go to the definition of the fun form and explain which mechanism causes this to work 
     ********************************************************************************************************/
    this.specialForms.fun = (args, scope) => {
      if (!args.length) {
        throw new SyntaxError("Functions need a body");
      }
      let body = args[args.length - 1];
      let params = args.slice(0, args.length - 1).map(expr => {
        if (expr.type != "word") {
          throw new SyntaxError("Parameter names must be words");
        }
        return expr.name;
      });
      let theEgg = this;
      return function () {
        if (arguments.length != params.length) {
          throw new TypeError("Wrong number of arguments");
        }
        let localScope = Object.create(scope);
        for (let i = 0; i < arguments.length; i++) {
          localScope[params[i]] = arguments[i];
        }
        return theEgg.evaluate(body, localScope);
      };
    };


  }
  /******************
   * CORE FUNCTIONS *
   ******************/
  run(program) {
    return this.evaluate(this.parse(program), Object.create(this.topScope));
  }
  evaluate(expr, scope) {
    if (expr.type == "value") {
      return expr.value;
    } else if (expr.type == "word") {
      if (expr.name in scope) {
        return scope[expr.name];
      } else {
        throw new ReferenceError(
          `Undefined binding: ${expr.name}`);
      }
    } else if (expr.type == "apply") {
      let { operator, args } = expr;
      if (operator.type == "word" &&
        operator.name in this.specialForms) {
        return this.specialForms[operator.name](expr.args, scope);
      } else {
        let op = this.evaluate(operator, scope);
        if (typeof op == "function") {
          let theEgg = this;
          return op(...args.map(arg => theEgg.evaluate(arg, scope))); // TODO MAYBE: the 'this.evaluate' may need refactoring
        } else {
          throw new TypeError("Applying a non-function.");
        }
      }
    }
  }
  parseExpression(program) {
    program = this.skipSpace(program);
    let match, expr;
    if (match = /^"([^"]*)"/.exec(program)) {
      expr = { type: "value", value: match[1] };
    } else if (match = /^\d+\b/.exec(program)) {
      expr = { type: "value", value: Number(match[0]) };
    } else if (match = /^[^\s(),#"]+/.exec(program)) {
      expr = { type: "word", name: match[0] };
    } else {
      throw new SyntaxError("Unexpected syntax: " + program);
    }

    return this.parseApply(expr, program.slice(match[0].length));
  }
  // DONE: implement skip over #comments\n
  skipSpace(string) {
    let firstNonSpace = string.search(/\S/);
    if (firstNonSpace == -1) return "";
    let trimmedString = string.slice(firstNonSpace);

    if (trimmedString.startsWith("#")) {
      let endOfComment = trimmedString.search("\n");
      if (endOfComment == -1) {
        return "";
      } else if (endOfComment == trimmedString.length) {
        return "";
      } else {
        return trimmedString.slice(endOfComment + 1);
      }
    } else {
      return trimmedString;
    }

  }
  parseApply(expr, program) {
    program = this.skipSpace(program);
    if (program[0] != "(") {
      return { expr: expr, rest: program };
    }

    program = this.skipSpace(program.slice(1));
    expr = { type: "apply", operator: expr, args: [] };
    while (program[0] != ")") {
      let arg = this.parseExpression(program);
      expr.args.push(arg.expr);
      program = this.skipSpace(arg.rest);
      if (program[0] == ",") {
        program = this.skipSpace(program.slice(1));
      } else if (program[0] != ")") {
        throw new SyntaxError("Expected ',' or ')'");
      }
    }
    return this.parseApply(expr, program.slice(1));
  }
  parse(program) {
    let { expr, rest } = this.parseExpression(program);
    if (this.skipSpace(rest).length > 0) {
      throw new SyntaxError("Unexpected text after program");
    }
    return expr;
  }

}
