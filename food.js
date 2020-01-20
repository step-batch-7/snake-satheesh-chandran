class Food {
  #colId;
  #rowId;
  #type;
  constructor(colId, rowId, type) {
    this.#colId = colId;
    this.#rowId = rowId;
    this.#type = type;
  }

  get position() {
    return [this.#colId, this.#rowId];
  }
  get type() {
    return this.#type;
  }
  state() {
    return {
      position: [this.#colId, this.#rowId],
      type: this.#type
    };
  }
}
