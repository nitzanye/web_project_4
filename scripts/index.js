import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import * as utils from "./utils.js";

export const settings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_type_submit",
  inactiveButtonClass: "button_type_submit-disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// forms
const editForm = document.querySelector(".popup__form_type_profile");
const addCardForm = document.querySelector(".popup__form_type_add-card");

const editFormValidator = new FormValidator(settings, editForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Popups
const popups = document.querySelectorAll(".popup");
const profilePopup = document.querySelector(".popup_type_profile");
const addCardPopup = document.querySelector(".popup_type_add-card");
const previewPopup = document.querySelector(".popup_type_preview");

//Forms Elements
const nameInput = document.querySelector(".popup__input_description_name");
const jobInput = document.querySelector(".popup__input_description_job");
const newCardTitleInput = document.querySelector(".popup__input_new_title");
const newCardUrlInput = document.querySelector(".popup__input_new_url");
const previewImageElement = document.querySelector(".popup__preview-image");
const previewImageElementTitle = document.querySelector(".popup__caption");

// DOM elements
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

//Buttons
const profileEditButton = document.querySelector(".button_type_edit");
const addCardButton = document.querySelector(".button_type_add");
const addCardCloseButton = document.querySelector(".button_type_close-add");
const profileCloseButton = document.querySelector(".button_type_close-profile");
const previewCloseButton = document.querySelector(".button_type_close-preview");

// Cards Template  //
const cardsTemplate = document.querySelector("#cards-template");

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

function openPopup(popType) {
  popType.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}
function closePopup(popType) {
  popType.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

// // Function Create Cards //

function createCard(card) {
  const newCardElement = cardsTemplate.content
    .querySelector(".cards__card")
    .cloneNode(true);

  newCardElement.querySelector(".cards__title").textContent = card.title;

  const imageEl = newCardElement.querySelector(".cards__image");
  imageEl.style.backgroundImage = `url(${card.link})`;
  imageEl.addEventListener("click", function () {
    previewImageElement.src = card.link;
    previewImageElement.alt = card.title;
    previewImageElementTitle.textContent = card.title;
    openPopup(previewPopup);
  });

  //handlerlikeicon +handlerDeleteCard
  const cardLikeButton = newCardElement.querySelector(".button_style_like");
  const cardDeleteButton = newCardElement.querySelector(".button_type_delete");

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("button_style_full");
  });

  cardDeleteButton.addEventListener("click", () => {
    newCardElement.remove();
  });

  return newCardElement;
}

// Function Render Cards + Add to the DOM//
function renderCard(card) {
  cardsList.prepend(createCard(card));
}

// // Function New Card Submit //
function handleNewCardSubmit(event) {
  event.preventDefault();
  const newCard = {
    title: newCardTitleInput.value,
    link: newCardUrlInput.value,
  };

  renderCard(newCard);
  closePopup(addCardPopup);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

function openProfilePopup() {
  editFormValidator.resetValidation();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // checkInitialFormValidity(profilePopup.querySelector("form"), settings);
  openPopup(profilePopup);
}

function closePopupOverlay(e) {
  if (e.target == e.currentTarget) {
    closePopup(e.target);
  }
}
function closePopupEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
////////////////
////  Even handlers
/////////////////////

popups.forEach((popup) => {
  popup.addEventListener("click", closePopupOverlay);
});

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  addCardFormValidator.resetValidation();
  // checkInitialFormValidity(addCardPopup.querySelector("form"), settings);

  openPopup(addCardPopup);
});

addCardCloseButton.addEventListener("click", () => closePopup(addCardPopup));

editForm.addEventListener("submit", handleProfileFormSubmit);

addCardForm.addEventListener("submit", handleNewCardSubmit);

profileEditButton.addEventListener("click", openProfilePopup);

previewCloseButton.addEventListener("click", () => closePopup(previewPopup));

profileCloseButton.addEventListener("click", () => closePopup(profilePopup));

initialCards.forEach(renderCard);

/////////////
