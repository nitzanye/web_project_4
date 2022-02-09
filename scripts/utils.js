import {
  renderCard,
  editFormValidator,
  addCardFormValidator,
  addCardPopup,
  profilePopup,
} from "./index.js";

const nameInput = document.querySelector(".popup__input_description_name");
const jobInput = document.querySelector(".popup__input_description_job");
const newCardTitleInput = document.querySelector(".popup__input_new_title");
const newCardUrlInput = document.querySelector(".popup__input_new_url");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

export const openPopup = (popType) => {
  popType.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
};

const closePopupEsc = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

export const closePopup = (popType) => {
  popType.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
};

export function closePopupOverlay(e) {
  if (e.target == e.currentTarget) {
    closePopup(e.target);
  }
}

export function handleNewCardClick() {
  addCardFormValidator.resetValidation();

  openPopup(addCardPopup);
}

export function openProfilePopup() {
  editFormValidator.resetValidation();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
}

export function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

export function handleNewCardSubmit(event) {
  event.preventDefault();
  const newCard = {
    title: newCardTitleInput.value,
    link: newCardUrlInput.value,
  };
  newCardTitleInput.value = "";
  newCardUrlInput.value = "";

  renderCard(newCard);
  closePopup(addCardPopup);
}
