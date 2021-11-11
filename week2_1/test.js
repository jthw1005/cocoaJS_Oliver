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
const MyHash = function(sizeOfMap) {
    this.sizeOfMap = sizeOfMap; 
    this.storage = [];
    this.storageSize = 0;
};

// getHashCode: 해시코드 반환
MyHash.prototype.getHashCode = function(key) {
    let hashCode = 0;
    let primeNum = 1051;
    
    for(let letter of key)
        hashCode += letter.codePointAt(0);

    hashCode %= primeNum;

    return hashCode;
};

// convertToIndex: 해시코드를 해시인덱스로 변환
MyHash.prototype.convertToIndex = function(hashCode) {
    let hashIndex = hashCode;
    if(this.sizeOfMap === 0)
        return null;
    else
        hashIndex %= this.sizeOfMap;
    return hashIndex;
};

// put: 키 & 값 추가.
MyHash.prototype.put = function(key, value) {
    const hashCode = this.getHashCode(key);
    const hashIndex = this.convertToIndex(hashCode);

    if(this.storage[hashIndex] === undefined) {
        this.storage[hashIndex] = new LinkedList();
        this.storage[hashIndex].append(key, value);
        this.storageSize++;
    }
    else {
        if(this.containKey(key)) {
            this.storage[hashIndex].getNode(key).value = value;
        }
        else {
            this.storage[hashIndex].append(key, value);
            this.storageSize++;
        }
    }
};

// remove: 해당 키의 위치의 키 & 값 삭제.
MyHash.prototype.remove = function(key) {
    const hashCode = this.getHashCode(key);
    const hashIndex = this.convertToIndex(hashCode);
    const indexToRemove = this.storage[hashIndex].getIndex(key);
    this.storage[hashIndex].remove(indexToRemove);
    this.storageSize--;
};

// containKey: 해당 키가 이미 존재하는지 판단 후 Bool값 반환.
MyHash.prototype.containKey = function(key) {
    const hashCode = this.getHashCode(key);
    const hashIndex = this.convertToIndex(hashCode);
    const indexOfKey = this.storage[hashIndex].getIndex(key);

    return indexOfKey !== null;
};

// get: 해당 키와 매치되는 값을 찾아서 반환.
MyHash.prototype.get = function(key) {
    const hashCode = this.getHashCode(key);
    const hashIndex = this.convertToIndex(hashCode);
    const valueOfKey = this.storage[hashIndex].getValue(key);

    return valueOfKey;
};

// isEmpty: 비어있는 맵인지 Bool 결과를 반환.
MyHash.prototype.isEmpty = function() {
    return (this.storageSize === 0);
};

// keys: 전체 키 목록을 배열로 반환.
MyHash.prototype.keys = function() {
    const arrOfKeys = [];

    this.storage.forEach((item, index) => {
        let currentNode = this.head;

        for(let nodeIndex = 1; nodeIndex <= this.storage[index].length; nodeIndex++) {
            arrOfKeys.push(currentNode.key);
            currentNode = currentNode.next;
        }
    });

    return arrOfKeys;
};

// replace: 해당키의 기존 값을 새로운 값으로 대체.
MyHash.prototype.replace = function(key, value) {
    const hashCode = this.getHashCode(key);
    const hashIndex = this.convertToIndex(hashCode);
    this.storage[hashIndex].getNode(key).value = value;
};

// size: 전체 아이템 개수를 반환.
MyHash.prototype.size = function() {
    return this.storageSize;
};

// clear() 전체 맵을 초기화한다.
MyHash.prototype.clear = function() {
    this.storage.forEach((item, index) => {
        this.storage[index] = undefined;
    });
};


/* Linked List for HashMap */
class Node {
    constructor(key, value) {
        this.key = key;
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

    getIndex(key) {
        let currentNode = this.head;

        for(let i = 0; i < this.length; i++) {
            if(currentNode.key === key)
                return i + 1;
            currentNode = currentNode.next;
        }
        return null;
    }

    getValue(key) {
        let currentNode = this.head;

        for(let i = 0; i < this.length; i++) {
            if(currentNode.key === key)
                return currentNode.value;
            currentNode = currentNode.next;
        }

        return null;
    }

    getNode(key) {
        let currentNode = this.head;

        for(let i = 0; i < this.length; i++) {
            if(currentNode.key === key)
                return currentNode;
            currentNode = currentNode.next;
        }

        return null;
    }

    getPrevCurrNodes(index) {
        if(index < 2 || this.length < 2) return null;
        else {
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
    }
};



/* Execution part */
const myHashMap = new MyHash(10);

myHashMap.put("oliver", "seoul");
myHashMap.put("jane", "newyork");
myHashMap.put("son", "london");
myHashMap.put("plivdr", "busan");

myHashMap.remove("plivdr");
myHashMap.remove("son");

myHashMap.put("tnn", "loddddndon");

console.log(myHashMap.storage[0]);
console.log(myHashMap.storage[1]);
console.log(myHashMap.storage[2]);
console.log(myHashMap.storage[3]);
console.log(myHashMap.storage[4]);
console.log(myHashMap.storage[5]);
console.log(myHashMap.storage[6]);
console.log(myHashMap.storage[7]);
console.log(myHashMap.storage[8]);
console.log(myHashMap.storage[9]);

