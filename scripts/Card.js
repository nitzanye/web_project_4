import { openPopup } from "./utils.js";

export class Card {
  constructor(card, templateCardSelector) {
    this._title = card.title;
    this._link = card.link;
    this._templateCardSelector = templateCardSelector;

    this._cardLikeButton = templateCardSelector.cardLikeButton;
    this._cardLikeActive = templateCardSelector._cardLikeActive;
    this._cardDeleteButton = templateCardSelector.cardDeleteButton;
    this._imageEl = templateCardSelector.imageEl;

    this._previewImageElement = document.querySelector(
      this._previewImageElement
    );
    this._previewImageElementTitle = document.querySelector(
      this._previewImageElementTitle
    );
  }

  _getCardTemplate() {
    const cardsTemplate = document
      .querySelector(templateCardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);
    return cardsTemplate;
  }

  _handleLikeButton = () =>
    this._cardLikeButton.classList.toggle(this._cardLikeActive);

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
