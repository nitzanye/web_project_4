export class Card {
  constructor(data, settings, handleCardClick) {
    this._title = data.title;
    this._link = data.link;
    this._handleCardClick = handleCardClick;

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

    this._previewPopup = document.querySelector(this._previewPopupSelector);

    // this._openPopup = settings.openPopup;
    // this._openPopup = settings.open;
  }

  _getCardTemplate() {
    return this._cardsTemplate.content
      .querySelector(this._cardSelector)
      .cloneNode(true);
  }

  _handleLikeButton = () => {
    this._cardLikeButton.classList.toggle(this._cardLikeActiveSelector);
  };

  _handleDeleteCard = () => this._element.remove();

  // _handlePreviewImage = () => { // i don't need this function anymore
  //   this._previewImageElement.src = this._link;
  //   this._previewImageElement.alt = this._title;
  //   this._previewImageElementTitle.textContent = this._title;
  //   this._openPopup(this._previewPopup);
  // };

  _addEventListeners() {
    this._cardLikeButton = this._element.querySelector(this._cardLikeSelector);
    this._cardDeleteButton = this._element.querySelector(
      this._cardDeleteSelector
    );

    this._cardLikeButton.addEventListener("click", this._handleLikeButton);
    this._cardDeleteButton.addEventListener("click", this._handleDeleteCard);
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._title, this._link)
    });
  }

  getCardElement = () => {
    this._element = this._getCardTemplate();
    this._imageElement = this._element.querySelector(this._imageElSelector);
    this._imageElement.style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".cards__title").textContent = this._title;

    this._addEventListeners();

    return this._element;
  };
}
