"use strict";
/*eslint-disable*/
/**************************
 * F.prototype
 **************************/
/* Changing "prototype"
In the code below we create new Rabbit, and then try to modify its prototype. */

function runRabbit1() {
  // In the start, we have this code:
  function Rabbit() { }
  Rabbit.prototype = {
    eats: true
  };
  let rabbit = new Rabbit();
  alert(rabbit.eats); // true
}

function runRabbit2() {
  // We added one more string(emphasized), what alert shows now ?
  function Rabbit() { }
  Rabbit.prototype = {
    eats: true
  };
  let rabbit = new Rabbit();
  Rabbit.prototype = {};
  alert(rabbit.eats); // true
  // with additional code below, any new Rabbit will NOT have eat in the prototype
  let newRabbit = new Rabbit();
  alert(newRabbit.eat);
}

function runRabbit3() {
  //…And if the code is like this(replaced one line) ?
  function Rabbit() { }
  Rabbit.prototype = {
    eats: true
  };
  let rabbit = new Rabbit();
  Rabbit.prototype.eats = false;
  alert(rabbit.eats); // false
}

function runRabbit4() {
  // Like this(replaced one line) ?
  function Rabbit() { }
  Rabbit.prototype = {
    eats: true
  };
  let rabbit = new Rabbit();
  delete rabbit.eats;
  alert(rabbit.eats); // true
}

function runRabbit5() {
  // The last variant:
  function Rabbit() { }
  Rabbit.prototype = {
    eats: true
  };
  let rabbit = new Rabbit();
  delete Rabbit.prototype.eats;
  alert(rabbit.eats); // undefined
}

/* Create an object with the same constructor
Imagine, we have an arbitrary object obj, created
by a constructor function – we don’t know which one,
but we’d like to create a new object using it.

Can we do it like that?
  let obj2 = new obj.constructor();
Give an example of a constructor function for obj which lets such code work right.
And an example that makes it work wrong.*/
function runObjWorking() {

  function Obj() {
    this.color = 'red';
  }

  let obj = new Obj();
  let obj2 = new obj.constructor();

  console.log("Original Obj:");
  console.log(obj);
  console.log("Second Obj:");
  console.log(obj2);
}

function runObjNotWorking() {

  function Obj() {
    this.color = 'red';
    this.constructor = 'blue';
  }

  let obj = new Obj();
  let obj2 = new obj.constructor();

  console.log("Original Obj:");
  console.log(obj);
  console.log("Second Obj:");
  console.log(obj2);
}

