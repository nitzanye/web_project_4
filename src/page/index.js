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
  editAvatarForm,
  nameInput,
  jobInput,
  avatarInput,
  profileEditButton,
  addCardButton,
  AvatarEditButton,
  settings,
} from "../utils/constants.js";

import { data } from "autoprefixer";

//// Set Loading Data Message for UX ////

const setLoadingMessage = (form, loadingMessage) => {
  form.querySelector(".button_type_submit").textContent = loadingMessage;
};

//////  Connection with API ////////

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "a68c011d-d292-456c-86c3-53eebc4a76ba",
    "Content-Type": "application/json",
  },
});

////// Add Intial Data /////

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__job",
  profileImageSelector: ".profile__image",
});

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, userData]) => {
    userId = userData._id;
    cardslist.render(cardData);

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatarlink: userData.avatar,
    });
  })
  .catch((err) => {
    console.log(err);
  });

const cardslist = new Section(
  {
    renderer: (data) => {
      cardslist.addItem(createCard(data));
    },
  },
  ".cards__list"
);

////// Add Intial Image /////

const imagePopup = new PopupWithImage(".popup_type_preview");
const confirmModal = new PopupWithSubmit(".popup_type_delete-card");

function createCard(data) {
  const card = new Card(
    {
      data,
      handleCardClick: () => {
        imagePopup.open(data);
      },
      handleLikeButton: (id) => {
        const isAlreadyLiked = card.isLiked();

        if (isAlreadyLiked) {
          api.unLikeCard(id).then((res) => {
            card.likeCard(res.likes);
          });
        } else {
          api.likeCard(id).then((res) => {
            card.likeCard(res.likes);
          });
        }
      },

      handleDeleteCard: (id) => {
        confirmModal.open();

        confirmModal.setAction(() => {
          api.deleteCard(id).then(() => {
            card.removeCard();
            confirmModal.close();
          });
        });
      },
    },
    {
      cardsTemplate: "#cards-template",
      cardSelector: ".cards__card",
      imageElSelector: ".cards__image",
      cardLikeSelector: ".button_style_like",
      cardLikeActiveSelector: "button_style_full",
      cardDeleteSelector: ".button_type_delete",
    },
    userId
  );
  return card.getCardElement();
}

//// Handle Form Submit /////

const handleNewCardSubmit = ({ nameInput: name, linkInput: link }) => {
  setLoadingMessage(addCardForm, "Saving...");
  api
    .addNewCard({ name, link })
    .then((res) => {
      cardslist.addNewItem(createCard(res));
      editModal.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setLoadingMessage(addCardForm, "Create"));
};

const handleEditFormSubmit = ({ name, job: about }) => {
  setLoadingMessage(editForm, "Saving...");
  api
    .updateUserInfo({ name, about })
    .then((user) => {
      userInfo.setUserInfo({ name: user.name, job: user.about, avatarlink: user.avatar });
      addCardModal.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setLoadingMessage(editForm, "Save"));
};

const handleEditAvatarSubmit = ({ avatarlink: avatar }) => {
  setLoadingMessage(editAvatarForm, "Saving...");
  api
    .editUserAvatar({avatar})
    .then((user) => {
      userInfo.setUserInfo({
        name: user.name,
        job: user.about,
        avatarlink: user.avatar
      });
      editAvatarModal.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setLoadingMessage(editAvatarForm, "Save"));
};

const editAvatarModal = new PopupWithForm(
  ".popup_type_avatar",
  handleEditAvatarSubmit
);

const editModal = new PopupWithForm(
  ".popup_type_profile",
  handleEditFormSubmit
);

const addCardModal = new PopupWithForm(
  ".popup_type_add-card",
  handleNewCardSubmit
);

addCardModal.setEventListeners();
confirmModal.setEventListeners();
editModal.setEventListeners();
editAvatarModal.setEventListeners();
imagePopup.setEventListeners();

const editAvatarValidator = new FormValidator(settings, editAvatarForm);
const editFormValidator = new FormValidator(settings, editForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);

editAvatarValidator.enableValidation();
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

AvatarEditButton.addEventListener("click", () => {
  editAvatarValidator.resetValidation();
  editAvatarModal.open();
  const data = userInfo.getUserInfo();

  avatarInput.value = data.avatarlink;
});

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
