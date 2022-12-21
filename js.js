//Build a Node class / factory. 
//It should have an attribute for the data it stores as well as its left and right children.

class Node {
    constructor (left, data, right) {
        this.left = left;
        this.data = data;
        this.right = right;
    }
}

//Build a Tree class / factory which accepts an array.
class Tree {
    constructor (array) {
        this.array = array;
        this.root = buildTree(this.array)
    }

    printRoot = () => {
        console.log(this.root);
    }

    prettyPrint = (node=this.root, prefix = '', isLeft = true) => {
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
            console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    // print all available values
    traverse = (node=this.root) => {
        if (node === null) {
            return;
        }
        console.log(node.data);
        this.traverse(node.left);
        this.traverse(node.right);
    }
    
    // insert = (value) => {
    //     if ()
    // }
    //insert,delete
    //find
    //level order
    //in order, preorder, postorder
    //height
    //depth
    //is balanced
    //rebalance
}

const myTree = new Tree([1,2,3,4]);
myTree.prettyPrint();
myTree.printRoot();
myTree.traverse();

//Write a buildTree function which takes an array of data  
//and turns it into a balanced binary tree full of Node objects appropriately placed 
//The buildTree function should return the level-0 root node.
function buildTree(input) {
    if (input === null) {
        return null;
    }
    else {
        const middleIndex = getMiddleIndex(0, input.length-1);
        const root = input[middleIndex];
        const curNode = new Node(buildTree(getLeft(input, middleIndex)), root, buildTree(getRight(input, middleIndex+1)));
        return curNode;
    }
}

function getMiddleIndex(start, end) {
    return parseInt((start+end)/2);
}

function getLeft(input, end) {
    if (end <= 0){
        return null;
    }
    const output = [];
    for (let i = 0; i < end; i++) {
        output.push(input[i]);
    }
    return output;
}

function getRight(input, start) {
    if (start >= input.length) {
        return null;
    }
    const output = [];
    for (let i = start; i <= input.length-1; i++) {
        output.push(input[i]);
    }
    return output;
}

module.exports = {getMiddleIndex, getLeft, getRight};

