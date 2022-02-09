export class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
    this._settings = settings;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  };

  _checkValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  };

  _setEventListeners = () => {
    this.inputElements = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this.inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkValidity(inputElement, this._settings);
        this._toggleButtonState();
      });
    });
  };

  _IsInputValid = () =>
    this.inputElements.every((inputElement) => inputElement.validity.valid);

  _toggleButtonState = () => {
    const buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );

    if (this._IsInputValid()) {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._inactiveButtonClass);
    } else {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._inactiveButtonClass);
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
