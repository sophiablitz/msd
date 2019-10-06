"use strict";
/*Use the class code given below to generate a little tree data structure.*/
// eslint-disable-next-line require-jsdoc
class TreeNode {
  // eslint-disable-next-line require-jsdoc
  constructor(value) {
    this.value = value;
    this.descendents = [];
  }
}
// create nodes with values
const abe = new TreeNode("Abe");
const homer = new TreeNode("Homer");
const bart = new TreeNode("Bart");
const lisa = new TreeNode("Lisa");
const maggie = new TreeNode("Maggie");
// associate root with is descendents
abe.descendents.push(homer);
homer.descendents.push(bart, lisa, maggie);


/**********************************************
 * Write recursive functions for the following:
 **********************************************/

/*   1. Given a target value, return true or false if there is a node in the tree with the target value.E.g.,
    contains(tree, “Lisa”) → true
contains(tree, “Crusty”) → false
 */

/**
 * Determine recursively if a given search value is present in a tree structure.
 * @param {TreeNode} treeNode head node of a tree structure to be searched
 * @param {String} searchValue string value to search for within tree structure
 * @returns {boolean} true if search value is found within the tree structure, else false
 */
function isValueInTree(treeNode, searchValue) {
  if (treeNode.value === searchValue) {
    return true;
  }
  if (treeNode.descendents.length == 0) {
    return false;
  } else {
    // eslint-disable-next-line id-length
    for (let i = 0; i < treeNode.descendents.length; i++) {
      if (isValueInTree(treeNode.descendents[i], searchValue)) {
        return true;
      }
    }
  }
  return false;
}
/**
 * Helper function to test exercise
 * @returns {undefined}
 */
function runIsValueInTree() {
  console.log(`Lisa is in the tree: ${isValueInTree(abe, "Lisa")}`);
  console.log(`Crusty is in the tree: ${isValueInTree(abe, "Crusty")}`);
}



/* 2. Given a target value, return the subtree with the found node as it’s root or null if no match.
Extend the tree to have a more interesting test.
Create a mocha test to run at least 2 or 3 tests
on your tree.
  findSubtree(tree, “Homer”) → subtree with Homer as the root */
/**
 * Find the parent node of a given search value if it is present in a tree structure, else null.
 * @param {TreeNode} treeNode head node of a tree structure to be searched
 * @param {String} searchValue string value to search for within tree structure
 * @returns {TreeNode} parent TreeNode of found search value, else null
 */
function findSubTree(treeNode, searchValue) {
  if (treeNode.value === searchValue) {
    return treeNode;
  }
  // eslint-disable-next-line id-length
  for (let childNode of treeNode.descendents){
    let result;
    if (result = findSubTree(childNode, searchValue)) {
      return result;
    }
  }
  return null;
}
/**
 * Helper function to test exercise
 * @returns {undefined}
 */
function runFindSubTree() {
  console.log("Find Lisa in the tree: ");
  console.log(findSubTree(abe, "Lisa"));
  console.log("Find Homer in the tree: ");
  console.log(findSubTree(abe, "Homer"));
  console.log("Find Crusty in the tree: ");
  console.log(findSubTree(abe, "Crusty"));
}

/* 3. Create a new class ListNode (based on TreeNode below) that generates a linked list of Abe,
  Homer, Bart, Lisa, Maggie instead of a tree. */
/**
 * Linked List node
 *
 * @class ListNode
 * @property {string} value The value of a given node
 * @property {ListNode} next The reference to another linked list node, or  null
 */
class ListNode {
  // eslint-disable-next-line require-jsdoc
  constructor(value, nextNode = null) {
    this.value = value;
    this.next = nextNode;
  }
}
let maggieListNode = new ListNode("Maggie");
let lisaListNode = new ListNode("Lisa", maggieListNode);
let bartListNode = new ListNode("Bart", lisaListNode);
let homerListNode = new ListNode("Homer", bartListNode);
let abeListNode = new ListNode("Abe", homerListNode);
/**
 * Helper function to test exercise
 * @returns {undefined}
 */
function runCreateListNode() {
  console.log(abeListNode);
}


/* 4. Given a target value in the list, return the node that contains the target value or null if no match.
  findListNode(list, “Bart”) */

/**
 * Find the list node of a given search value if it is present in a linked list structure, else null.
 * @param {ListNode} listNode head node of a linked list structure to be searched
 * @param {String} searchValue string value to search for within linked list structure
 * @returns {ListNode} linked list node of found search value, else null
 */
function findListNode(listNode, searchValue) {
  if (listNode.value === searchValue) {
    return listNode;
  }
  if (listNode.next){
    return findListNode(listNode.next,searchValue);
  }
}
/**
 * Helper function to test exercise
 * @returns {undefined}
 */
function runFindListNode() {
  console.log("Find Lisa in the list: ");
  console.log(findListNode(abeListNode, "Lisa"));
  console.log("Find Homer in the tree: ");
  console.log(findListNode(abeListNode, "Homer"));
  console.log("Find Crusty in the tree: ");
  console.log(findListNode(abeListNode, "Crusty"));

}

/* 5. Write a recursive function, treeModifier, that will take a tree and a modifier function as
parameters. Walk through the tree and apply the function to each node. The function should
apply some operation to a node. Write a function that will change the value of a node to be all
caps. Write another that will change the value to have *** in front and behind the node value.
Write another that will reverse the string of the node value. Call your recursive function with
each of these modifier functions.
  treeModifier(tree, modiferFunc)
  allCaps(node)
  addStars(node)
  reverseNode(node) */
/**
 * Runs a function for each node in a tree structure
 * @param {treeNode} treeNode a node of tree structure of TreeNodes
 * @param {function(node: TreeNode)} modify predicate with parameter TreeNode
 * @returns {undefined}
 */
function treeModifer(treeNode, modify){
    modify(treeNode);
    for (let child of treeNode.descendents){
      treeModifer(child, modify);
    }  
}
/**
 * Modify treeNode property 'value' to all uppercase
 * @param {TreeNode} treeNode TreeNode with value to be modified to all uppercase
 * @returns {undefined}
 */
function allCaps(treeNode){
  treeNode.value = treeNode.value.toUpperCase();
}
/**
 * Modify treeNode property 'value' to include prefix and suffix of '***'
 * @param {TreeNode} treeNode TreeNode with value to be modified to include prefix and suffix of '***'
 * @returns {undefined}
 */
function addStars(treeNode) {
  treeNode.value = "***" + treeNode.value + "***";
}
/**
 * Modify treeNode property 'value' to reverse  
 * @param {TreeNode} treeNode TreeNode with value to be reversed
 * @returns {undefined}
 */
function reverse(treeNode) {
  let string = treeNode.value;
  treeNode.value = "";
  for (let char of string){
    treeNode.value = char + treeNode.value;
  }
}
/**
 * Helper function to test exercise
 * @returns {undefined}
 */
function runTreeModifer() {
  console.log("All caps");
  treeModifer(abe, allCaps);
  console.log(abe);
  console.log("Add stars");
  treeModifer(abe, addStars);
  console.log(abe);
  console.log("reverse:");
  treeModifer(abe, reverse);
  console.log(abe);
}