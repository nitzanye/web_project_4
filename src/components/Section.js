export class Section {
  constructor({ renderer }, containerSelector) {
    
    this._renderer = renderer

    this._container = document.querySelector(containerSelector);
  }

  render(items) {
    this._items = items  
    items.forEach(this._renderer);
    };
    

  addItem(element) {
    this._container.prepend(element);
  }
}


// export class Section {
//   constructor({ items, renderer }, containerSelector) {
//     this._items = items  
//     this._renderer = renderer

//     this._container = document.querySelector(containerSelector);
//   }

//   // instead of set this method with card, we set it with item
//   render(items) {
//     items.forEach(this._renderer);
//     };
   
  
//   // render() {
//   //   this._items.forEach(data => {
//   //     this._renderer(data);
//   //   });
//   // } 

//   addItem(element) {
//     this._container.prepend(element);
//   }
// }