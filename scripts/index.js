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
const popups = document.querySelectorAll(".popup");
const profilePopup = document.querySelector(".popup_type_profile");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const nameInput = document.querySelector(".popup__input_description_name");
const jobInput = document.querySelector(".popup__input_description_job");

// const newCardTitleInput = document.querySelector(".popup__input_new_title");
// const newCardUrlInput = document.querySelector(".popup__input_new_url");

//Buttons
const profileEditButton = document.querySelector(".button_type_edit");
const addCardButton = document.querySelector(".button_type_add");
const addCardCloseButton = document.querySelector(".button_type_close-add");
const profileCloseButton = document.querySelector(".button_type_close-profile");
const previewCloseButton = document.querySelector(".button_type_close-preview");

/// Wrapper ////


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




const cardsList = document.querySelector(".cards__list");
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
      previewImageElementSelector: ".popup__preview-image",
      previewImageElementTitleSelector: ".popup__caption",
      previewPopupSelector: ".popup_type_preview",
      // openPopup: open
    }, (title, link) => {
      imagePopup.open(title, link)
    }
  )} 
 

  const section = new Section({ 
    items: initialCards, 
    renderer: (data) => {
      // render(data, cardsList);
   const card = generateCard(data)
    section.addItem(card.getCardElement());
  
   } 
  }, ".cards__card")
  
  section.render();

    //  cardsList.prepend(card.getCardElement());
  // return card.getCardElement();



const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__job",
});



const editModal = new PopupWithForm(".popup_type_profile", (data) => {
  userInfo.setUserInfo(data);
});
editModal.setEventListeners();



const addCardModal = new PopupWithForm(".popup_type_add-card", (data) => {
    const card = generateCard({
    title: data["popup__input_image_title"],
    link: data.link,
  })

  section.addItem(card.getCardElement())
})

addCardModal.setEventListeners();


const editFormValidator = new FormValidator(settings, editForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);

imagePopup.setEventListeners();


cardsList.render(initialCards);
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





////////////////////////////////////////////////////////


// const renderCard = (data, cardsList) => {
//   const card = generateCard(data)
//   cardsList.prepend(card.getCardElement());
// }

// profileName.textContent = data.name;
// profileJob.textContent = data.job;
// handleProfileFormSubmit()

// function handleProfileFormSubmit(event) {

//   utils.closePopup(profilePopup);
// }

// const addCardPopup = document.querySelector(".popup_type_add-card");

  // const newCard = {
  //   title: newCardTitleInput.value,
  //   link: newCardUrlInput.value,

  // newCardTitleInput.value = "";
  // newCardUrlInput.value = "";

  // renderCard(newCard);
  // utils.closePopup(addCardPopup);

  // renderCard(data, cardsList);
// });

// const previewPopup = document.querySelector(".popup_type_preview");


// function renderCard(data) {
//   cardsList.prepend(createCard(data));
// }


//  i have this method in Section ////


// initialCards.forEach(renderCard);


// function handleNewCardClick() {
//   addCardFormValidator.resetValidation();

  // addCardForm.open();
// }

// function handleProfilePopupClick() {
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
//   editFormValidator.resetValidation();
//   utils.openPopup(profilePopup);
// }

// function handleProfileFormSubmit(event) {
//   event.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   utils.closePopup(profilePopup);
// }

// function handleNewCardSubmit(event) {
//   event.preventDefault();
//   const newCard = {
//     title: newCardTitleInput.value,
//     link: newCardUrlInput.value,
//   };
//   newCardTitleInput.value = "";
//   newCardUrlInput.value = "";

//   renderCard(newCard);
//   // utils.closePopup(addCardPopup);
// }

////////////////
////  Even handlers
/////////////////////

// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", utils.closePopupOverlay);
// });


// addCardCloseButton.addEventListener("click", () => {
//   addCardModal.close();
// });

// editForm.addEventListener("submit", handleProfileFormSubmit);

// addCardForm.addEventListener("submit", handleNewCardSubmit);


// previewCloseButton.addEventListener("click", () =>
//   utils.closePopup(previewPopup)
// );

// profileCloseButton.addEventListener("click", () =>
//   utils.closePopup(profilePopup)
// )



// function createCard(card) { 

//   const newCardElement = new Card( 

//     { 
//       title: card.title, 
//       link: card.link, 
//     }, 

//     { 
//       cardsTemplate: "#cards-template", 
//       cardSelector: ".cards__card", 
//       imageElSelector: ".cards__image", 
//       cardLikeSelector: ".button_style_like", 
//       cardLikeActiveSelector: "button_style_full", 
//       cardDeleteSelector: ".button_type_delete", 
//       previewImageElementSelector: ".popup__preview-image", 
//       previewImageElementTitleSelector: ".popup__caption", 
//       previewPopupSelector: ".popup_type_preview", 
//       // openPopup: open
//     },
//     cardSelector 

//   ); 

//   return newCardElement.getCardElement(); 

// } 

// function renderCard(card) { 
//   cardsList.prepend(createCard(card)); 

// } 