// Forms
const previewPopup = document.querySelector(".popup_type_preview");
const addCardPopup = document.querySelector(".popup_type_add-card");
const profilePopup = document.querySelector(".popup_type_profile");
const formProfile = document.querySelector(".popup__form_type_profile");
const formAddCard = document.querySelector(".popup__form_type_add-card");
const nameInput = document.querySelector(".popup__input_description_name");
const jobInput = document.querySelector(".popup__input_description_job");
const previewImageElement = document.querySelector(".popup__preview-image");
const previewImageElementTitle = document.querySelector(".popup__caption");

// Buttons and other DOM elements
const addCardButton = document.querySelector(".button_type_add");
const previewCloseButton = document.querySelector(".button_type_close_preview");
const addCloseButton = document.querySelector(".button_type_close_add");
const profileCloseButton = document.querySelector(".button_type_close_profile");
const settingsButton = document.querySelector(".button_type_edit");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// Add new card Form //
const cardsTemplate = document.querySelector("#cards-template");
const newCardTitleInput = document.querySelector(".popup__input_new_title");
const newCardUrlInput = document.querySelector(".popup__input_new_url");

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
];

//////////////////
//   Functions
/////////////////

function togglePopup(formWindow) {
  if (formWindow.classList.contains("popup_opened")) {
    formWindow.classList.remove("popup_opened");
  } else {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    formWindow.classList.add("popup_opened");
  }
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
    togglePopup(previewPopup);
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
  cardsList.append(createCard(card));
}

// // Function New Card Submit //
function newCardSubmit(event) {
  event.preventDefault();
  const newCard = {
    title: newCardTitleInput.value,
    link: newCardUrlInput.value,
  };

  renderCard(newCard);
  togglePopup(addCardPopup);
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(profilePopup);
}

////////////////
////  Even handlers
/////////////////////

addCardButton.addEventListener("click", () => {
  formAddCard.reset();
  togglePopup(addCardPopup);
});

addCloseButton.addEventListener("click", () => togglePopup(addCardPopup));

formProfile.addEventListener("submit", formSubmitHandler);

formAddCard.addEventListener("submit", newCardSubmit);

settingsButton.addEventListener("click", () => togglePopup(profilePopup));

previewCloseButton.addEventListener("click", () => togglePopup(previewPopup));

profileCloseButton.addEventListener("click", () => togglePopup(profilePopup));

initialCards.forEach((card) => renderCard(card, cardsList));
