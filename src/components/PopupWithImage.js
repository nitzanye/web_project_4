import { Popup } from "./Popup.js"; // once we work with webpack we don't need js

export class PopupWithImage extends Popup {
  
   
    open({name, link}) { 
        
        this._popupElement.querySelector(".popup__caption").textContent = name;
        this._popupElement.querySelector(".popup__preview-image").src = link;
        this._popupElement.querySelector(".popup__preview-image").alt = name;

        super.open();
  }
}




