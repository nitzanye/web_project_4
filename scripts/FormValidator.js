import { settings } from "./index.js";

export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError = (inputElement, errorMessage) => {
    const { inputErrorClass, errorClass } = this._settings;

    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };

  _hideError = (inputElement) => {
    const { inputErrorClass, errorClass } = this._settings;

    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
  };

  _checkValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  };

  _setEventListeners = () => {
    const { inputSelector } = this._settings;

    this.inputElements = Array.from(
      this._formElement.querySelectorAll(inputSelector)
    );

    this.inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkValidity(inputElement, settings);
        this._toggleButtonState();
      });
    });
  };

  _IsInputValid = () =>
    this.inputElements.every((inputElement) => inputElement.validity.valid);

  _toggleButtonState = () => {
    const { inactiveButtonClass } = this._settings;
    const buttonElement = this._formElement.querySelector(
      settings.submitButtonSelector
    );

    if (this._IsInputValid()) {
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
    } else {
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
    }
  };

  resetValidation() {
    this.inputElements.forEach((inputElement) => {
      this._hideError(inputElement);
    });

    this._toggleButtonState();
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => e.preventDefault());

    this._setEventListeners();
  }
}
