// 문자열 키와 문자열 값을 저장하는 해시맵 라이브러리 구현
// 객체로 구현하셈

const Hash = function() {
    this.storage = {};
    this.cnt = 0;
};

// put(String key, String value) 키-값을 추가한다.
Hash.prototype.put = function(key, value) {
    this.storage[key] = value;
    this.cnt++;
};

// remove(String key) 해당 키에 있는 값을 삭제한다.
Hash.prototype.remove = function(key) {
    delete this.collection[key];
    this.cnt--;
};

// containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
Hash.prototype.containKey = function(key) {
    return key in this.storage;
};

// get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.
Hash.prototype.get = function(key) {
    return this.storage[key];
};

// isEmpty() 비어있는 맵인지 Bool 결과를 리턴한다.
Hash.prototype.isEmpty = function() {
    return (this.cnt === 0);
};

// keys() 전체 키 목록을 [String] 배열로 리턴한다.
Hash.prototype.keys = function() {
    const arr = [];

    for(key in this.storage)
        arr.push(key);

    return arr;
};

// replace(String key, String value) 해당키의 기존 값을 새로운 값으로 대체한다.
Hash.prototype.replace = function(key, value) {
    this.storage[key] = value;
};

// size() 전체 아이템 개수를 리턴한다.
Hash.prototype.size = function() {
    return this.cnt;
};

// clear() 전체 맵을 초기화한다.
Hash.prototype.clear = function() {
    this.storage = {};
    this.cnt = 0;
};



// execution part
const data1 = new Hash();

data1.put('a', '1');
data1.put('b', '2');
data1.put('c', '3');

data1.replace('a', '2');

console.log(data1);

console.log(data1.keys());
console.log(data1.size());