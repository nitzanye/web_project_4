import { Popup } from "./Popup.js"; // once we work with webpack we don't need js

export class PopupWithImage extends Popup {
  
    constructor(popupSelector) {
        super(popupSelector);
    }


    open(title, link) { 
        super.open();
        this._popupElement.querySelector(".popup__caption").textContent = title;
        this._popupElement.querySelector(".popup__preview-image").src = link;
        this._popupElement.querySelector(".popup__preview-image").alt = title;
  }
}




// export class PopupWithImage extends Popup {
  
//     open(title, link) { //{ caption, link , and default setting- undefined}
//       const imageElement = this._popupElement.querySelector(".popup__preview-image");
//       const captionElement = this._popupElement.querySelector(".popup__caption");


//       imageElement.src = link;
//       captionElement.textContent = title;
      
//       super.open();
    
//       // image.alt = title;
//   }
// }


// move this constance to index.js //
// const popupImage = new PopupWithImage(".popup__preview-image") //this is the selector
// popupImage.open("", "");