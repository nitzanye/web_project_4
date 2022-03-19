export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;  
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  render(items) {
    items.forEach(this._renderer);
    }
  
  prependItem(element) {
      this._container.prepend(element);
    }  

  addItem(element) {
    this._container.append(element);
  }
}


