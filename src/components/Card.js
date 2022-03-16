export class Card {
  constructor({ data, handleDeleteCard, handleCardClick, handleLikeButton }, settings, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;

    this._handleCardClick = handleCardClick;
    this._handleLikeButton = handleLikeButton;
    this._handleDeleteCard = handleDeleteCard;
    this._id = data._id;

    this._cardSelector = settings.cardSelector;
    this._cardLikeSelector = settings.cardLikeSelector;
    this._cardLikeActiveSelector = settings.cardLikeActiveSelector;
    this._cardDeleteSelector = settings.cardDeleteSelector;
    this._imageElSelector = settings.imageElSelector;

    this._userId = userId;
    this._ownerId = data.owner._id;

    this._cardsTemplate = document.querySelector("#cards-template");
  }

  _getCardTemplate() {
    return this._cardsTemplate.content
      .querySelector(this._cardSelector)
      .cloneNode(true);
  }

  

  isLiked() {
    return this._likes.some((person) => person._id === this._userId)

  }

  removeCard() {
    this._element.remove();

    this._element = null;
  }

  likeCard(newLikes) {
    this._likes = newLikes
    this._element.querySelector(".cards__like-count").textContent = this._likes.length;

    this._cardLikeButton.classList.toggle(this._cardLikeActiveSelector);

  }

  _addEventListeners() {
    this._cardLikeButton = this._element.querySelector(this._cardLikeSelector);
    this._cardDeleteButton = this._element.querySelector(
      this._cardDeleteSelector
    );

    this._cardLikeButton.addEventListener("click", () => this._handleLikeButton(this._id));
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

    if (this._ownerId !== this._userId) {
      this._cardDeleteButton = this._element.querySelector(
        this._cardDeleteSelector
      ).style.display = "none";
    }

    this._element.querySelector(".cards__like-count").textContent = this._likes.length;

    
    if(this.isLiked()) {
      this.likeCard(this._likes)
    }

    return this._element;
  };
}
