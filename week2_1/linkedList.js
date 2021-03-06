/* Linked List */
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
};

class LinkedList { // index: 1 ~ n
    constructor() {
        this.head = null;
        this.tail = this.head;
        this.length = 0;
    }

    getPrevCurrNodes(index) {
        let count = 0;
        let prevNode = this.head;
        let currNode = prevNode.next;

        while(count < index - 2) {
            prevNode = prevNode.next;
            currNode = prevNode.next;
            count++;
        }

        return { prevNode, currNode };
    }

    append(value) {
        const newNode = new Node(value);

        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    remove(index) {
        let { prevNode, currNode } = this.getPrevCurrNodes(index);
        prevNode.next = currNode.next;
        this.length--;
    }

    remove(index) {

        // index가 1일 때
            // length가 1 일 때
            // length가 2~ 일 때
        if(index === 1) {
            if(this.length < 2) {
                this.head = null;
                this.tail = null;
            }
            else
                this.head = this.head.next;
        }

        // index가 n일 때
        else if(index = this.length) {
            let { prevNode, currNode } = this.getPrevCurrNodes(index);
            this.tail = prevNode;
            prevNode.next = null;
        }

        // index가 2 ~ n-1 일 때
        else if(index >= 2 || index < this.length) {
            let { prevNode, currNode } = this.getPrevCurrNodes(index);
            prevNode.next = currNode.next;
        }
        
        this.length--;
    }

    lookup(index) {
        let counter = 0;
        let currentNode = this.head;
        while(counter < index) {
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode;
    }

    getNode(value) {
        let currentNode = this.head;

        for(let i = 0; i < this.length; i++) {
            if(currentNode.value = value)
                return currentNode;
            currentNode = currentNode.next;
        }
        return null;
    }
};

/* Execution part */
const myList = new LinkedList();

let arr = [];

arr[0] = myList;

console.log(arr[0]);

myList.append(10);
myList.append(20);
myList.append(30);
myList.append(40);
myList.remove(4);