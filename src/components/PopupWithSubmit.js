import { Popup } from "./Popup.js";

class PopupWithSubmit extends Popup {
  setAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
    super.setEventListeners();
  }
}

export default PopupWithSubmit;
