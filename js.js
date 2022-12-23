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
    
    //find
    find = (value, node=this.root) => {
        if (value === node.data) {
            return node;
        }
        else {
            const left = node.left;
            const right = node.right;
            let result = null;
            if (!nodeIsNull(left)) {
                result = this.find(value, left);
            }
            if (!nodeIsNull(right) && result === null) {
                result = this.find(value, right);
            }
            return result;
        }
    }

    //level order
    levelOrder = () => {
        const node = this.root;
        const q = [];
        const d = [];
        q.push(node);
        while (q.length !== 0) {
            const curNode = q[0];
            d.push(curNode.data);
            if (curNode.left !== null) {
                q.push(curNode.left);
            }
            if (curNode.right !== null) {
                q.push(curNode.right);
            }
            q.shift();
        }
        return d;
    }

    //in order, preorder, postorder
    // inorder: left,root,right / preorder: root,left,right / postorder: left,right, root
    preOrder = (node = this.root, array=[]) => {
        // example: input = [1,2,3,4,5] output = [3,1,2,4,5]
        if (node === null) {
            return array;
        }
        array = this.preOrder(node.left, [... array, node.data]);
        array = this.preOrder(node.right, array);
        return array;
    }

    inOrder = (node = this.root, array=[]) => {
        // example: input = [1,2,3,4,5] output = [1,2,3,4,5]
        if (node === null) {
            return array;
        }
        // go to the left most sub tree.
        array = this.preOrder(node.left, array);
        array = [... array, node.data];
        array = this.preOrder(node.right, array);
        return array;
        // null,1,2,
    }

    postOrder = (node = this.root, array=[]) => { //left,right,root
        // example: input = [1,2,3,4,5] output = [2,1,5,4,3]
        if (node === null) {
            return array;
        }
        // go to the left most sub tree.
        array = this.postOrder(node.left, array);
        array = this.postOrder(node.right, array);
        array = [... array, node.data];
        return array;
    }

    //insert
    insert = (value, pre=null, node=this.root) => {
        if (node === null) {
            // do insertion
            if (value > pre.data) {
                // insert to right
                pre.right = new Node(null, value, null);
            }
            else if (value < pre.data) {
                // insert to left
                pre.left = new Node(null, value, null);
            }
            return;
        }
        else {
            if (value > node.data) {
                // to right
                this.insert(value, pre=node, node.right);
            }
            if (value < node.data) {
                // to left
                this.insert(value, pre=node, node.left);
            }
        }
    }

    //delete
    delete = (value, pre = null, node = this.root) => {
        if (value === node.data) {
            //  case 1. single leaf
            if (node.left === null && node.right === null) {
                console.log ("it's childless.");
                if (value > pre.data) {
                    pre.right = null;
                }  
                if (value < pre.data) {
                    pre.left = null;
                }
            }
            // case 2. single child. make the parent to point at the next item.
            else if (node.left === null || node.right === null) {
                console.log ("one child");
                if (pre.left.data === node.data) {
                    if (node.left === null) {
                        pre.left = node.right;
                    }
                    if (node.right === null) {
                        pre.left = node.left;
                    }
                }
                else if (pre.right.data === node.data) {
                    if (node.left === null) {
                        pre.right = node.right;
                    }
                    if (node.right === null) {
                        pre.right = node.left;
                    }
                }
            }
            // case 3. both children exist
            else {
                // console.log ("both children exist");
                // sub case 1. replacement is childless.
                const replacement = node.right;
                if (replacement.left === null && replacement.right === null) {
                    console.log ("replacement childress");
                    if (pre.left.data === node.data) {
                        pre.left.data = replacement.data;
                        node.right = null;
                    }
                    else if (pre.right.data === node.data) {
                        pre.right.data = replacement.data;
                        node.right = null;
                    }
                }
                // sub case 2. replacement has both of children
                else if (replacement.left === null && replacement.right !== null) {
                    console.log("left is null");
                    node.data = replacement.data;
                    node.right = replacement.right;
                }
                // else if (replacement.right === null && replacement.left !== null) {
                //     console.log("right is null");
                //     let tmp = replacement;
                //     let newReplacement = tmp;
                //     while (tmp !== null) {
                //         newReplacement = tmp;
                //         tmp = tmp.left;
                //     }
                //     // console.log(node);
                //     // step2. replace the target data with the data of replacement.
                //     node.data = newReplacement.data;
                //     // step3. the left of the parent node of the replacement
                //     //        now must point to the next right node of the replacement.
                //     // console.log(newReplacement.data);
                //     this.leftMostNull(newReplacement.data, replacement);
                //     // node.right.left = newReplacement.right;
                // }
                else if (replacement.left !== null && replacement.right !== null) {
                    console.log ("replacement has both of children");
                    // step1. in the replacement, go to the left most children.
                    let tmp = replacement;
                    let newReplacement = tmp;

                    while (tmp !== null) {
                        newReplacement = tmp;
                        tmp = tmp.left;
                    }
                    // step2. replace the target data with the data of replacement.
                    // this is only when there is are children on the left side.
                    // console.log(node);
                    node.data = newReplacement.data;
                    // if (replacement.left.right !== null) {
                    //     console.log("test");
                    //     console.log(node);
                    //     // node.right.left = replacement.left.right;
                    // }
                    this.leftMostNull(node.data, node.right);
                    // step3. the left of the parent node of the replacement
                }
            }
        }
        else {
            const left = node.left;
            const right = node.right;
            if (left !== null) {
                this.delete(value, pre = node, left);
            }
            if (right !== null) {
                this.delete(value, pre = node, right);
            }
        }
    }

    leftMostNull = (value, node) => {
        if (node.left.data === value) {
            node.left = null;
            return;
        }
        else {
            this.leftMostNull(value, node.left);
        }
    }
    // case1. single leaf. Make the parent to point at null.
    // case2. single child. make the parent to point at the next item.
    // case3. both children.
    //        case1 no children:
    //              step1. find the next biggest. (at the right subtree.)
    //              step2. find the the left most number.
    //              step3. replace the target value with this number.
    //        case2 with children:
    //              step1. the children are always gonna be on the right.
    //              step2. make the parent node to point at the item right after the replacement.
    //height
    //depth     
    //is balanced  
    //rebalance
}

const myTree = new Tree([1,2,3,4,5,6,7,8,9]);
// myTree.prettyPrint();
// myTree.printRoot();
// myTree.traverse();
myTree.delete(5);
myTree.insert(6.1);
myTree.insert(6.05);
myTree.insert(6.11);
myTree.delete(6);
// myTree.delete(6.05);
myTree.prettyPrint();

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

function nodeIsNull(input) {
    if (input === null) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = {getMiddleIndex, getLeft, getRight};