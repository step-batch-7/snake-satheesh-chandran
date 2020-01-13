class A {
  #x;
  constructor(x) {
    this.#x = x;
  }
  get status() {
    return `A{${this.#x}}`;
  }
}

const a = new A(5);
console.log(a.status);
