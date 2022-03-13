export class Section {
  constructor({ renderer }, containerSelector) {
    
    this._renderer = renderer

    this._container = document.querySelector(containerSelector);
  }

  render(items) {
    this._items = items  
    items.forEach(this._renderer);
    };
  
  addNewItem(element) {
      this._container.prepend(element);
    }  

  addItem(element) {
    this._container.append(element);
  }
}


