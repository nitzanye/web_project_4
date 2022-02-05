import {
  openPopup,
  previewPopup,
  previewImageElement,
  previewImageElementTitle,
} from "./utils.js";

export class Card {
  constructor({ title, link }, templateCardSelector) {
    this._title = title;
    this._link = link;
    this._templateCardSelector = templateCardSelector;

    this._cardLikeButton =
      this._newCardElement.querySelector(".button_style_like");
    this._cardDeleteButton = this._newCardElement.querySelector(
      ".button_type_delete"
    );
    this._imageEl = this._newCardElement.querySelector(".cards__image");
  }

  _getCardTemplate() {
    const cardsTemplate = document
      .querySelector(templateCardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);
    return cardsTemplate;
  }

  _handleLikeButton = (evt) => evt.target.classList.toggle("button_style_full");

  _handleDeleteCard = () => this._newCardElement.remove();

  _handlePreviewImage = () => {
    previewImageElement.src = this._link;
    previewImageElement.alt = this._title;
    previewImageElementTitle.textContent = this._title;
    openPopup(previewPopup);
  };

  _addEventListeners() {
    this._cardLikeButton.addEventListener("click", this._handleLikeButton);
    this._cardDeleteButton.addEventListener("click", this._handleDeleteCard);
    this._imageEl.addEventListener("click", this._handlePreviewImage);
  }

  getCardElement = () => {
    this._newCardElement = this._getCardTemplate();

    this._imageEl.style.backgroundImage = `url(${this._link})`;
    this._newCardElement.querySelector(".cards__title").textContent =
      this._title;

    this._addEventListeners();

    return this._newCardElement;
  };
}
