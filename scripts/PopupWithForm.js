import { Popup } from "./Popup.js";


export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector); //gives me the acsess to this._popupElement

        this._popupForm = this._popupElement.querySelector(".popup__form");
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        const inputs = [...this._popupForm.querySelectorAll(".popup__input")]
        const inputValues = {}

        inputs.forEach((input) => {
            inputValues[input.name] = input.value
        })

        return inputValues;
    }

    setEventListeners() {
       
        this._popupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues())
            this.close();
        })
            super.setEventListeners()
    }

    close() {
        this._popupForm.reset();
        super.close();
        //maybe need to switch the places of the reset and close
    }
}




