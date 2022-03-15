import "../page/index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Api from "../components/Api.js";

import {
  editForm,
  addCardForm,
  nameInput,
  jobInput,
  profileEditButton,
  addCardButton,
  settings,
} from "../utils/constants.js";

import { data } from "autoprefixer";

//////  Connection with API ////////
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "a68c011d-d292-456c-86c3-53eebc4a76ba",
    "Content-Type": "application/json",
  },
});

////// Add Intial User /////

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__job",
});

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({ name: res.name, job: res.about });
  })
  .catch((err) => {
    console.log(err);
  });

/// Add Initial cards /////

api
  .getInitialCards()
  .then((cards) => {
    cardslist.render(cards);
  })
  .catch((err) => {
    console.log(err);
  });

const cardslist = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);
      cardslist.addItem(card.getCardElement());
    },
  },
  ".cards__list"
);

////// Add Intial Image /////
const imagePopup = new PopupWithImage(".popup_type_preview");
const confirmModal = new PopupWithSubmit(".popup_type_delete-card");

confirmModal.setEventListeners();

function createCard(data) {
  const card = new Card(
    {
      name: data.name,
      link: data.link,
      id,
    },
    {
      handleDeleteCard
      },
    {
      cardsTemplate: "#cards-template",
      cardSelector: ".cards__card",
      imageElSelector: ".cards__image",
      cardLikeSelector: ".button_style_like",
      cardLikeActiveSelector: "button_style_full",
      cardDeleteSelector: ".button_type_delete",
    },

    (name, link) => {
      imagePopup.open(name, link);
    }
  );

  return card.getCardElement();
}

//// Add New Card /////

const handleNewCardSubmit = ({ nameInput: name, linkInput: link }) => {
  api
    .addNewCard({ name, link })
    .then((res) => {
      const card = createCard(res);
      cardslist.addItem(card.getCardElement());
    })
    .catch((err) => {
      console.log(err);
    });
};

const addCardModal = new PopupWithForm(
  ".popup_type_add-card",
  handleNewCardSubmit
);

addCardModal.setEventListeners();

const editModal = new PopupWithForm(".popup_type_profile", (data) => {
  userInfo.setUserInfo(data);
});

editModal.setEventListeners();
imagePopup.setEventListeners();

const editFormValidator = new FormValidator(settings, editForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);

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
