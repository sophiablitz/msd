"use strict";
let node3 = {
  name: "p",
  value: "This is text in the a paragraph",
  children: null
};
let node4 = {
  name: "label",
  value: "Name",
  children: null
};
let node5 = {
  name: "input",
  value: "this was typed by a user",
  children: null
};
let node2 = {
  name: "div",
  value: null,
  children: [node4, node5]
};
let node1 = {
  name: "body",
  children: [node2, node3],
  value: null,
};

/**
 * Print to the console the 'name' and 'value' property of a node and
 * all of its descendants up to and including the third generation.
 *
 * @param {object} node object with properties 'name', 'value' and 'children'
 *    where children is either null or an array of similar nodes.
 */
function printNameValuePairsLoop(node) {
  console.log(`${node.name}: ${node.value}`);
  if (node.children) {
    node.children.forEach(innerNode => { 
      console.log(`${innerNode.name}: ${innerNode.value}`); 
      if (innerNode.children) {
        innerNode.children.forEach(n => {
          console.log(`${n.name}: ${n.value}`);
        });
      }
    });
  }

}
/**
 * Print to the console the 'name' and 'value' property of a node and
 * all of its descendants.
 *
 * @param {object} node object with properties 'name', 'value' and 'children'
 *    where children is either null or an array of similar nodes.
 */
function printNameValuePairsRecursive(node) {
  console.log(`${node.name}: ${node.value}`);
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      printNameValuePairsRecursive(node.children[i]);
    }
  }
}