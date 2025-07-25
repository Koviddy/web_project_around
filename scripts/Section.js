import { api } from "./Api.js";

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    api.getInitialCards().then((cards) => {
      this._items = cards;
      this.render();
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = "";
  }

  render() {
    this.clear();

    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
