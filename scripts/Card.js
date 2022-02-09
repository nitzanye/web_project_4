export class Card {
  constructor(card, settings) {
    this._title = card.title;
    this._link = card.link;

    this._templateCardSelector = settings;
    this._cardSelector = settings.cardSelector;

    this._cardLikeSelector = settings.cardLikeSelector;
    this._cardLikeActiveSelector = settings.cardLikeActiveSelector;
    this._cardDeleteSelector = settings.cardDeleteSelector;
    this._imageElSelector = settings.imageElSelector;
    this._previewImageElementSelector = settings.previewImageElementSelector;
    this._previewImageElementTitleSelector =
      settings.previewImageElementTitleSelector;
    this._previewPopupSelector = settings.previewPopupSelector;

    this._previewImageElement = document.querySelector(
      this._previewImageElementSelector
    );
    this._previewImageElementTitle = document.querySelector(
      this._previewImageElementTitleSelector
    );
    this._cardsTemplate = document.querySelector("#cards-template");

    this._cardLikeActive = document.querySelector(this._cardLikeActiveSelector);

    this._previewPopup = document.querySelector(this._previewPopupSelector);

    this._openPopup = settings.openPopup;
  }

  _getCardTemplate() {
    return this._cardsTemplate.content
      .querySelector(this._cardSelector)
      .cloneNode(true);
  }

  _handleLikeButton = () =>
    this._cardLikeButton.classList.toggle(this._cardLikeActive);

  _handleDeleteCard = () => this._newCardElement.remove();

  _handlePreviewImage = () => {
    this._previewImageElement.src = this._link;
    this._previewImageElement.alt = this._title;
    this._previewImageElementTitle.textContent = this._title;
    this._openPopup(this._previewPopup);
  };

  _addEventListeners() {
    this._cardLikeButton = this._newCardElement.querySelector(
      this._cardLikeSelector
    );
    this._cardDeleteButton = this._newCardElement.querySelector(
      this._cardDeleteSelector
    );

    this._cardLikeButton.addEventListener("click", this._handleLikeButton);
    this._cardDeleteButton.addEventListener("click", this._handleDeleteCard);
    this._imageEl.addEventListener("click", this._handlePreviewImage);
  }

  getCardElement = () => {
    this._newCardElement = this._getCardTemplate();
    this._imageEl = this._newCardElement.querySelector(this._imageElSelector);
    this._imageEl.style.backgroundImage = `url(${this._link})`;
    this._newCardElement.querySelector(".cards__title").textContent =
      this._title;

    this._addEventListeners();

    return this._newCardElement;
  };
}
