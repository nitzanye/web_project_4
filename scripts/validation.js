const showError = (form, input) => {
  const error = input.validationMessage;
  const errorElement = document.querySelector(`#${input.id}-error`);
  input.classList.add("popup__input_type_error");
  errorElement.textContent = error;
};
const hideError = (form, input) => {
  const errorElement = document.querySelector(`#${input.id}-error`);
  input.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
};

const checkValidity = (form, input) => {
  if (input.validity.valid) {
    hideError(form, input);
  } else {
    showError(form, input);
  }
};

// IsInputValid checks the validity of the fields
const IsInputValid = (inputs) => {
  return inputs.every((input) => {
    return input.validity.valid;
  });
};

// toggleButtonState change the button state based on IsInputValid
const toggleButtonState = (inputs, buttonElement) => {
  if (IsInputValid(inputs)) {
    // buttonElement.disabled = false;
    buttonElement.classList.remove("button_type_submit_disabled");
  } else {
    // buttonElement.disabled = "disabled"
    buttonElement.classList.add("button_type_submit_disabled");
  }
};

const setEventListeners = (form) => {
  const inputs = Array.from(form.querySelectorAll(".popup__input"));
  const buttonElement = form.querySelector(".button_type_submit");

  toggleButtonState(inputs, buttonElement);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkValidity(form, input);

      toggleButtonState(inputs, buttonElement);
    });
  });
};

const enableValidation = (settings) => {
  // find all forms //
  const forms = Array.from(document.querySelectorAll(".popup__form"));
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => e.preventDefault());

    setEventListeners(form);
  });
};

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
