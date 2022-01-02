const settingsButton = document.querySelector(".button_type_edit");
const profilePopup = document.querySelector(".popup_type_profile");
const profileCloseButton = document.querySelector(".button_type_close");
const profileName = document.querySelector(".profile__name");
const nameInput = document.querySelector(".popup__input_description_name");
const profileJob = document.querySelector(".profile__job");
const jobInput = document.querySelector(".popup__input_description_job");
const form = document.querySelector(".popup__form");

// Add new card Form //
const addPopup = document.querySelector(".popup_type_add");
const addCloseButton = document.querySelector(".button_type_close_add");
const addCardForm = document.querySelector(".popup__form__add-card");
const newCardTitleInput = document.querySelector(".popup__input_new_title");
const newCardUrlInput = document.querySelector(".popup__input_new_url");

// Cards //
const cardsTemplate = document.querySelector("#cards-template");
const cardsList = document.querySelector(".cards__list");
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
];

// Function Create Cards //
function createCard(card) {
  let newCardElement = cardsTemplate.content
    .querySelector(".cards__card")
    .cloneNode(true);
  newCardElement.querySelector(".cards__image").src = card.link;
  newCardElement.querySelector(".cards__title").textContent = card.title;
  return newCardElement;
}

// Function Render Cards + Add to the DOM//
function renderCard(card) {
  cardsList.appendChild(card);
}

initialCards.forEach((card) => {
  renderCard(createCard(card));
});

// function togglePopup(popup) {
//   popup.classList.toggle("popup_opened");
// }

// // Function Popup //
function togglePopup(popup) {
  if (popup.classList.contains("popup_opened")) {
    popup.classList.remove("popup_opened");
  } else {
    //     nameInput.value = profileName.textContent;
    //     jobInput.value = profileJob.textContent;
    popup.classList.add("popup_opened");
  }
}

// Function New Card Submit //
function newCardSubmit(event) {
  event.preventDefault();
  let newCard = {};
  newCardTitle = newCardTitleInput.value;
  newCardUrl = newCardUrlInput.value;
  renderCard(createCard(newCard));
}

settingsButton.addEventListener("click", () => togglePopup(profilePopup));
profileCloseButton.addEventListener("click", () => togglePopup(profilePopup));
addCloseButton.addEventListener("click", () => togglePopup(addPopup));

form.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup();
});

addCardButton.addEventListener("click", function (event) {
  togglePopup(addPopup);
});

addCardForm.addEventListener("submit", (event) => newCardSubmit(event));
