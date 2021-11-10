/*
# 과제 내용
'해시 맵'을 객체로 구현하고 '해시 함수'와 'collision 대비 알고리즘'을 적용한다.

# 문제 조건
0. 객체로 구현한다.
1. 이 때 prototype을 이용한다.
2. key와 value는 모두 문자열이다.
 
# 설계 방향
0. 문자열에 적합한 additive hash function을 이용한다. -> 향후 universal로 변경
1. chaining 알고리즘을 적용한다.
2. 이 때 하나의 배열 내에서 linked list를 적용한다.

# 코드 설계
a. write
    step0. 
    step1. 
    step2. 

    step3. 
    step4. 
    step5. 
    step6. 

b. read
    step0. key를 
    step1. 
    step2. 
    step3. 
    step4. 
    step5. 
    step6. 

c. delete
    step0. 이전 노드의 next를 
*/


/* HashMap */
const MyHash = function() {
    this.storage = [];
    this.storageSize = 0;
};


// put(String key, String value) 키-값을 추가한다.
MyHash.prototype.put = function(key, value) {
    this.storage[key] = value;
    this.cnt++;
};

// remove(String key) 해당 키에 있는 값을 삭제한다.
MyHash.prototype.remove = function(key) {
    delete this.collection[key];
    this.cnt--;
};

// containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
MyHash.prototype.containKey = function(key) {
    return key in this.storage;
};

// get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.
MyHash.prototype.get = function(key) {
    return this.storage[key];
};

// isEmpty() 비어있는 맵인지 Bool 결과를 리턴한다.
MyHash.prototype.isEmpty = function() {
    return (this.cnt === 0);
};

// keys() 전체 키 목록을 [String] 배열로 리턴한다.
MyHash.prototype.keys = function() {
    const arr = [];

    for(key in this.storage)
        arr.push(key);

    return arr;
};

// replace(String key, String value) 해당키의 기존 값을 새로운 값으로 대체한다.
MyHash.prototype.replace = function(key, value) {
    this.storage[key] = value;
};

// size() 전체 아이템 개수를 리턴한다.
MyHash.prototype.size = function() {
    return this.cnt;
};

// clear() 전체 맵을 초기화한다.
MyHash.prototype.clear = function() {
    this.storage = {};
    this.cnt = 0;
};


/* Linked List for HashMap */
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
};

class LinkedList {
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

    append(key, value) {
        const newNode = new Node(key, value);

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

    lookup(index) {
        let counter = 0;
        let currentNode = this.head;
        while(counter < index) {
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode;
    }

    getValue(key) {
        let currentNode = this.head;

        for(let i = 0; i < this.length; i++) {
            if(currentNode.key = key)
                return currentNode.value;
            currentNode = currentNode.next;
        }
        return null;
    }
};


/* execution part */ 
const data1 = new Hash();

data1.put('a', '1');
data1.put('b', '2');
data1.put('c', '3');

data1.replace('a', '2');

console.log(data1);

console.log(data1.keys());
console.log(data1.size());
