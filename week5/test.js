class Test {
  print() {
    if (i === 0) {
      return 0;
    }
    console.log(i);
    i--;
    this.print();
  }
}

let i = 5;
const one = new Test();

one.print();
