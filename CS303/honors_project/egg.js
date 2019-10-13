/*eslint-disable*/
// Project defined at https://eloquentjavascript.net/12_language.html
// TODO: put all egg code into an egg object (namespace).
// TODO: complete exercises named as todo
// TODO: Write mocha tests in test.js
// TODO: Complete jsdoc documentation (see namespace documentation in assignment)
// TODO: Create jsdoc webpage
// TODO: Create Try-it-now style input and output box in index.html
// TODO: change print implementation to print to the screen
//         - update documentation
//         - update test


/*************************
 * TOP SCOPE INITIALIZED *
 *************************/
const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;
// TODO: implement arrays
topScope.array = "...";

topScope.length = "...";

topScope.element = "...";
for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
  topScope[op] = Function("a, b", `return a ${op} b;`);
}
topScope.print = value => {
  console.log(value);
  return value;
};
/*****************************
 * SPECIAL FORMS INITIALIZED *
 *****************************/
const specialForms = Object.create(null);
specialForms.do = (args, scope) => {
  let value = false;
  for (let arg of args) {
    value = evaluate(arg, scope);
  }
  return value;
};
specialForms.if = (args, scope) => {
  if (args.length != 3) {
    throw new SyntaxError("Wrong number of args to if");
  } else if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope);
  } else {
    return evaluate(args[2], scope);
  }
};
specialForms.while = (args, scope) => {
  if (args.length != 2) {
    throw new SyntaxError("Wrong number of args to while");
  }
  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }

  // Since undefined does not exist in Egg, we return false,
  // for lack of a meaningful result.
  return false;
};
specialForms.define = (args, scope) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of define");
  }
  let value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};
// TODO: add form 'set', like 'define', but only sets existing values. If no binding found, throw a 'ReferenceError'. See 'Fixing scope'.
specialForms.set = (args, scope) => {
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
specialForms.fun = (args, scope) => {
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

  return function () {
    if (arguments.length != params.length) {
      throw new TypeError("Wrong number of arguments");
    }
    let localScope = Object.create(scope);
    for (let i = 0; i < arguments.length; i++) {
      localScope[params[i]] = arguments[i];
    }
    return evaluate(body, localScope);
  };
};

/******************
 * CORE FUNCTIONS *
 ******************/
function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}
function evaluate(expr, scope) {
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
      operator.name in specialForms) {
      return specialForms[operator.name](expr.args, scope);
    } else {
      let op = evaluate(operator, scope);
      if (typeof op == "function") {
        return op(...args.map(arg => evaluate(arg, scope)));
      } else {
        throw new TypeError("Applying a non-function.");
      }
    }
  }
}
function parseExpression(program) {
  program = skipSpace(program);
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

  return parseApply(expr, program.slice(match[0].length));
}
// TODO: implement skip over #comments\n
function skipSpace(string) {
  let first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}
function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != "(") {
    return { expr: expr, rest: program };
  }

  program = skipSpace(program.slice(1));
  expr = { type: "apply", operator: expr, args: [] };
  while (program[0] != ")") {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",") {
      program = skipSpace(program.slice(1));
    } else if (program[0] != ")") {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }
  return parseApply(expr, program.slice(1));
}
function parse(program) {
  let { expr, rest } = parseExpression(program);
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }
  return expr;
}
/*********************
 * TESTS FOR MY CODE *
 *********************/
function runspecialFormsSetTest() {
  run(`
do(define(x, 4),
   define(setx, fun(val, set(x, val))),
   setx(50),
   print(x))
`);
  // → 50
  run(`set(quux, true)`);
  // → Some kind of ReferenceError
}
function runArraysTest() {
  run(`
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
`);
  // → 6
}
function runAllMyCodeTests(){
  console.log("*****************************");
  console.log("Special Forms 'set' test should output 50, then reference error");
  runspecialFormsSetTest();
  console.log("*****************************");
  console.log("Arrays test should output 6");
  runArraysTest();
}
/*******************
 * LANGUAGE TESTS  *
 *******************/
function runClosureTest() {
  run(`
do(define(f, fun(a, fun(b, +(a, b)))),
   print(f(4)(5)))
`);
  // → 9
}
function runFunctionsTest() {
  run(`
do(define(plusOne, fun(a, +(a, 1))),
   print(plusOne(10)))
`);
  // → 11

  run(`
do(define(pow, fun(base, exp,
     if(==(exp, 0),
        1,
        *(base, pow(base, -(exp, 1)))))),
   print(pow(2, 10)))
`);
  // → 1024
}
function runScopeTest() {
  run(`
do(define(total, 0),
   define(count, 1),
   while(<(count, 11),
         do(define(total, +(total, count)),
            define(count, +(count, 1)))),
   print(total))
`);
  // → 55
}
function runParseTest() {
  console.log(parse("+(a, 10)"));
  // → {type: "apply",
  //    operator: {type: "word", name: "+"},
  //    args: [{type: "word", name: "a"},
  //           {type: "value", value: 10}]}
}
function runAllLanguageTests() {
  console.log("*****************************");
  console.log("Closure test should output 9");
  runClosureTest();
  console.log("*****************************");
  console.log("Functions test should output 11, then 1024");
  runFunctionsTest();
  console.log("*****************************");
  console.log("Scope test should output 55");
  runScopeTest();
  console.log("*****************************");
  console.log("Parse test should output ");
  console.log(`{type: "apply",
    operator: {type: "word", name: "+"},
    args: [{type: "word", name: "a"},
           {type: "value", value: 10}]}`);
  runParseTest();

}