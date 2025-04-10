export default class Card {
  constructor(dataCard,  templateSelector, popupWithImage) {
    this._image = dataCard.image;
    this._name = dataCard.name;
    this._templateSelector = templateSelector;
    this._popupWithImage = popupWithImage;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#template-card")
      .content.querySelector(".elements__li")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".elements__card-img").src = this._image;
    this._element.querySelector(".elements__card-name").alt = this._name;
    this._element.querySelector(".elements__card-name").textContent = this._name;

    return this._element;
  }

  _like() {
    const likeButton = this._element
    .querySelector(".elements__button-like");

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("elements__button-like_click");
    });
  }

  _trash() {
    const trashButton = this._element
    .querySelector(".elements__trash");
    trashButton.addEventListener("click", () => {
      const elementRemove = trashButton.closest(".elements__li");
      elementRemove.remove();
    });
  }

  _setEventListeners() {
    this._like();
    this._trash();
    this._element.querySelector(".elements__card-img").addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  _handleImageClick() {
    this._popupWithImage.open(this._image, this._name);
  }
}