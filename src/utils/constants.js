
// forms
export const editForm = document.querySelector(".popup__form_type_profile");
export const addCardForm = document.querySelector(".popup__form_type_add-card");

// Popups
export const nameInput = document.querySelector(".popup__input_description_name");
export const jobInput = document.querySelector(".popup__input_description_job");


//Buttons
export const profileEditButton = document.querySelector(".button_type_edit");
export const addCardButton = document.querySelector(".button_type_add");


export const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".button_type_submit",
    inactiveButtonClass: "button_type_submit-disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

export const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg",
    },
  ].reverse();