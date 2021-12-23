const settingsButton = document.querySelector(".button_type_edit");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".button_type_close");
const profileName = document.querySelector(".profile__name");
const nameInput = document.querySelector(".popup__input_description_name");
const profileJob = document.querySelector(".profile__job");
const jobInput = document.querySelector(".popup__input_description_job");
const form = document.querySelector(".popup__form");

function togglePopup() {
  if (popup.classList.contains("popup_opened")) {
    popup.classList.remove("popup_opened");
  } else {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popup.classList.add("popup_opened");
  }
}

settingsButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup();
});
