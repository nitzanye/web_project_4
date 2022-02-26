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




