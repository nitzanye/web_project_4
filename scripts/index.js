import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import * as utils from "./utils.js";

export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_type_submit",
  inactiveButtonClass: "button_type_submit-disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// forms
const editForm = document.querySelector(".popup__form_type_profile");
const addCardForm = document.querySelector(".popup__form_type_add-card");

export const editFormValidator = new FormValidator(settings, editForm);
export const addCardFormValidator = new FormValidator(settings, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Popups
const popups = document.querySelectorAll(".popup");
export const profilePopup = document.querySelector(".popup_type_profile");
export const addCardPopup = document.querySelector(".popup_type_add-card");
const previewPopup = document.querySelector(".popup_type_preview");

//Buttons
const profileEditButton = document.querySelector(".button_type_edit");
const addCardButton = document.querySelector(".button_type_add");
const addCardCloseButton = document.querySelector(".button_type_close-add");
const profileCloseButton = document.querySelector(".button_type_close-profile");
const previewCloseButton = document.querySelector(".button_type_close-preview");

/// Wrapper ////
const cardsList = document.querySelector(".cards__list");

const initialCards = [
  {
    title: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    title: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    title: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    title: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    title: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
].reverse();

//////////////////
//   Functions
/////////////////

function createCard(card) {
  const newCardElement = new Card(
    {
      title: card.title,
      link: card.link,
    },
    {
      cardsTemplate: "#cards-template",
      cardSelector: ".cards__card",
      imageElSelector: ".cards__image",
      cardLikeSelector: ".button_style_like",
      cardLikeActiveSelector: "button_style_full",
      cardDeleteSelector: ".button_type_delete",
      previewImageElementSelector: ".popup__preview-image",
      previewImageElementTitleSelector: ".popup__caption",
      previewPopupSelector: ".popup_type_preview",
      openPopup: utils.openPopup,
    }
  );
  return newCardElement.getCardElement();
}

export function renderCard(card) {
  cardsList.prepend(createCard(card));
}

////////////////
////  Even handlers
/////////////////////

popups.forEach((popup) => {
  popup.addEventListener("click", utils.closePopupOverlay);
});

addCardButton.addEventListener("click", utils.handleNewCardClick);

addCardCloseButton.addEventListener("click", () =>
  utils.closePopup(addCardPopup)
);

editForm.addEventListener("submit", utils.handleProfileFormSubmit);

addCardForm.addEventListener("submit", utils.handleNewCardSubmit);

profileEditButton.addEventListener("click", utils.openProfilePopup);

previewCloseButton.addEventListener("click", () =>
  utils.closePopup(previewPopup)
);

profileCloseButton.addEventListener("click", () =>
  utils.closePopup(profilePopup)
);

initialCards.forEach(renderCard);
