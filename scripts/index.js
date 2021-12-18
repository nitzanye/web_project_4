const settingsButton = document.querySelector(".button__info");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const profileName = document.querySelector(".profile__name");
const nameInput = document.querySelector(".popup__name-input");
const profileJob = document.querySelector(".profile__job");
const jobInput = document.querySelector(".popup__job-input");
const form = document.querySelector(".popup__form");

function togglePopup() {
  popup.classList.toggle("popup_opened");
  /*
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent; */
}

settingsButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
});
