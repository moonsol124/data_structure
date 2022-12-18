// Node
class Node {
    constructor(value=null, next=null) {
        this.value = value;
        this.next = next;
    }
}
// Linked list
class LinkedList {
    list = {value: 2, next: null};

    // add to the last
    append(newNode, oldNode = this.list) {
        if (oldNode.next === null) {  
            oldNode.next = newNode;
            return;
        }
        this.append(newNode, oldNode.next);
    }

    // add to the beginning
    prepend(value) {
        const newNode = new Node(value, this.list);
        this.list = newNode;
    }

    // get list
    getList() {
        return this.list;
    }

    // get total number of nodes
    getNumberOfNodes(node = this.list, count = 0) {
        if (node.next === null) {
            return 1;
        }
        else {
            let sum = 1;
            sum += this.getNumberOfNodes(node.next, count);
            return sum;
        }
    }

    // get the fist node
    getHead(node = this.list, count = 0) {
        if (count >= 1) {
            return node;
        }
        count++;
        return this.getHead(node, count);
    }

    // get the last node
    getTail(node = this.list) {
        if (node.next === null) {
            return node;
        }
        return this.getTail(node.next);
    }

    // get the node at a given index.
    getNodeAt(i, node = this.list, count = 0) {
        if (count === i) {
            return node;
        }
        count++;
        return this.getNodeAt(i, node.next, count);
    }

    // remove the last node
    pop(node = this.list, target = this.getNumberOfNodes(this.list), curIndex = 0) {
        if (target === 1) {
            return;
        }
        if (curIndex === target-2) {
            node.next = null;
            return;
        }
        curIndex++;
        this.pop(node.next, target, curIndex);
    }

    // returns true if passed value is in the list.
    contains(node = this.list, value) {
        if (node.value === value) {
            return true;
        }
        if (node.next === null) {
            return false;
        }

        return this.contains(node.next, value);
    }

    // returns the index of the node containing value, or null if not found.
    find(value, node = this.list, count = 0) {
        if (node.value === value) {
            return count;
        }
        if (node.next === null) {
            return null;
        }
        count++;
        return this.find(value,node.next, count++);
    }

    // represents your LinkedList objects as strings, 
    //so you can print them out and preview them in the console. 
    //The format should be: ( value ) -> ( value ) -> ( value ) -> null
    toString(node = this.list, string="") {
        string += `${node.value} -> `;
        if (node.next === null) {
            string += 'null';
            return string;
        }
        return this.toString(node.next, string);
    }

    //insertAt(value, index) that inserts a new node with the provided value at the given index.
    insertAt(value, index, node = this.list, count = 1) {
        if (index === 0) {
            const newNode = new Node(value, node);
            this.list = newNode;
            return;
        }
        if (count === index) {
            const newNode = new Node(value, node);
            node.next = newNode;
            return;
        }
        count++;
        this.insertAt(node.next, value, index, count);
    }
}
