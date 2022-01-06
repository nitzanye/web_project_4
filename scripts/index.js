// Popups
const profilePopup = document.querySelector(".popup_type_profile");
const addCardPopup = document.querySelector(".popup_type_add-card");
const previewPopup = document.querySelector(".popup_type_preview");

//Forms
const formProfile = document.querySelector(".popup__form_type_profile");
const formAddCard = document.querySelector(".popup__form_type_add-card");

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
}
function closePopup(popType) {
  popType.classList.remove("popup_opened");
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
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
}

////////////////
////  Even handlers
/////////////////////

addCardButton.addEventListener("click", () => {
  formAddCard.reset();
  openPopup(addCardPopup);
});

addCardCloseButton.addEventListener("click", () => closePopup(addCardPopup));

formProfile.addEventListener("submit", handleProfileFormSubmit);

formAddCard.addEventListener("submit", handleNewCardSubmit);

profileEditButton.addEventListener("click", openProfilePopup);

previewCloseButton.addEventListener("click", () => closePopup(previewPopup));

profileCloseButton.addEventListener("click", () => closePopup(profilePopup));

initialCards.forEach(renderCard);
