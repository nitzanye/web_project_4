const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_type_submit",
  inactiveButtonClass: "button_type_submit-disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const showInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
};

const checkValidity = (formElement, inputElement, settings) => {
  if (inputElement.validity.valid) {
    hideError(formElement, inputElement, settings);
  } else {
    showInputError(formElement, inputElement, settings);
  }
};

// IsInputValid checks the validity of the fields
const IsInputValid = (inputElements) => {
  return inputElements.every((inputElement) => {
    return inputElement.validity.valid;
  });
};

// toggleButtonState change the button state based on IsInputValid
const toggleButtonState = (inputElements, buttonElement, settings) => {
  if (IsInputValid(inputElements)) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = "disabled";
    buttonElement.classList.add(settings.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputElements = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  toggleButtonState(inputElements, buttonElement, settings);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkValidity(formElement, inputElement, settings);

      toggleButtonState(inputElements, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  // find all forms //
  const forms = document.querySelectorAll(settings.formSelector);

  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => e.preventDefault());

    setEventListeners(formElement, settings);
  });
};

const checkInitialFormValidity = (formElement, settings) => {
  const inputElements = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  toggleButtonState(inputElements, buttonElement, settings);
};

enableValidation(config);
