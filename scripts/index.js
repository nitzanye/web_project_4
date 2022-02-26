import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
// import * as utils from "./utils.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { Section } from "./Section.js";

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

// Popups

const nameInput = document.querySelector(".popup__input_description_name");
const jobInput = document.querySelector(".popup__input_description_job");


//Buttons
const profileEditButton = document.querySelector(".button_type_edit");
const addCardButton = document.querySelector(".button_type_add");




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


const imagePopup = new PopupWithImage(".popup_type_preview");

const generateCard = (data) => {
  return new Card(
    {
      title: data.title,
      link: data.link,
    },
    {
      cardsTemplate: "#cards-template",
      cardSelector: ".cards__card",
      imageElSelector: ".cards__image",
      cardLikeSelector: ".button_style_like",
      cardLikeActiveSelector: "button_style_full",
      cardDeleteSelector: ".button_type_delete",
    },
    (title, link) => {
      imagePopup.open(title, link);
    }
  );
};

const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = generateCard(data);
      section.addItem(card.getCardElement());
    },
  },
  ".cards__list"
);

section.render();


const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__job",
});

const editModal = new PopupWithForm(".popup_type_profile", (data) => {
  userInfo.setUserInfo(data);
});
editModal.setEventListeners();

const addCardModal = new PopupWithForm(
  ".popup_type_add-card",
  ({ nameInput: title, linkInput: link }) => {
    const card = generateCard({ title, link });

    section.addItem(card.getCardElement());
  }
);

addCardModal.setEventListeners();

const editFormValidator = new FormValidator(settings, editForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);

imagePopup.setEventListeners();

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardModal.open();
});

profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  editModal.open();
  const data = userInfo.getUserInfo();

  nameInput.value = data.name;
  jobInput.value = data.job;
});


