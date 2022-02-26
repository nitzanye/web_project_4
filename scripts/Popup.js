// import { closePopupEsc } from "./utils.js"

export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this.close = this.close.bind(this)
    // this._handleEscClose = handleEscClose;
  }

  _handleEscClose = (evt) => {
    //need to finish this function
    evt.preventDefault();

    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    // need to add the overlay closing here
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("button_type_close")) {
        this.close();
      }
    });
  }

  open() {
    this._popupElement.classList.add(".popup_opened");
    document.addEventListener("keyup", this._handleEscClose);
    
  }

  close() {
    this._popupElement.classList.remove(".popup_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  };
}


//setEventListeners better overlay
// export function closePopupOverlay(e) {
//     if (e.target == e.currentTarget) {
//       closePopup(e.target);
//     }
//   }