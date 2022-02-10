export class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
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
        this._checkValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _checkIfFormValid = () =>
    this.inputElements.every((inputElement) => inputElement.validity.valid);

  _toggleButtonState = () => {
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    if (this._checkIfFormValid()) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
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
