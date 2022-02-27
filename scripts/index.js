import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { Section } from "./Section.js";
import {
  initialCards, 
  editForm,
  addCardForm,
  nameInput,
  jobInput,
  profileEditButton,
  addCardButton,
  settings
  
}
 from "../utils/constants.js";



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


const addCardModal = new PopupWithForm(
  ".popup_type_add-card",
  ({ nameInput: title, linkInput: link }) => {
    const card = generateCard({ title, link });

    section.addItem(card.getCardElement());
  }
);


editModal.setEventListeners();
addCardModal.setEventListeners();
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


