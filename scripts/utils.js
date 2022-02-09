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

export function openProfilePopup() {
  editFormValidator.resetValidation();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // checkInitialFormValidity(profilePopup.querySelector("form"), settings);
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

  renderCard(newCard);
  closePopup(addCardPopup);
}
