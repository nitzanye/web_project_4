export class Card {
  constructor({ data, handleDeleteCard, handleCardClick }, settings) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;

    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;

    this._cardSelector = settings.cardSelector;
    this._cardLikeSelector = settings.cardLikeSelector;
    this._cardLikeActiveSelector = settings.cardLikeActiveSelector;
    this._cardDeleteSelector = settings.cardDeleteSelector;
    this._imageElSelector = settings.imageElSelector;

    this._cardsTemplate = document.querySelector("#cards-template");
  }

  _getCardTemplate() {
    return this._cardsTemplate.content
      .querySelector(this._cardSelector)
      .cloneNode(true);
  }

  _handleLikeButton = () => {
    this._cardLikeButton.classList.toggle(this._cardLikeActiveSelector);
  };

  removeCard() {
    this._element.remove();

    this._element = null;
  }

  _addEventListeners() {
    this._cardLikeButton = this._element.querySelector(this._cardLikeSelector);
    this._cardDeleteButton = this._element.querySelector(
      this._cardDeleteSelector
    );

    this._cardLikeButton.addEventListener("click", this._handleLikeButton);
    this._cardDeleteButton.addEventListener("click", () =>
      this._handleDeleteCard(this._id)
    );
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  getCardElement = () => {
    this._element = this._getCardTemplate();
    this._imageElement = this._element.querySelector(this._imageElSelector);
    this._imageElement.style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".cards__title").textContent = this._name;

    this._addEventListeners();
    console.log(this._element);

    return this._element;
  };
}
