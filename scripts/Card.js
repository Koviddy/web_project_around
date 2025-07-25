import { api } from "./Api.js";

export default class Card {
  constructor(dataCard,  templateSelector, popupWithImage, popupWithDelete, currentUserId) {
    this._id = dataCard._id;
    this._image = dataCard.link;
    this._name = dataCard.name;
    this._isLiked = dataCard.isLiked;
    this._ownerId = dataCard.owner && currentUserId;
    this._currentUserId = currentUserId;
    this._templateSelector = templateSelector;
    this._popupWithImage = popupWithImage;
    this._popupWithDelete = popupWithDelete;
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

  // Esconde o botão de lixeira se não for o dono
  if (this._ownerId !== this._currentUserId) {
    const trashButton = this._element.querySelector(".elements__trash");
    if (trashButton) {
      trashButton.style.display = "none";
    }
  }

  const likeButton = this._element.querySelector(".elements__button-like");
  if (this._isLiked) {
    likeButton.classList.add("elements__button-like_click");
  }

  return this._element;
}

  _like() {
    const likeButton = this._element.querySelector(".elements__button-like");

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("elements__button-like_click");
      
      this._isLiked = !this._isLiked;

      if (this._isLiked) {
        api.addLike(this._id)
          .then((data) => {
            console.log("Card liked:", data);
          })
          .catch((error) => {
            console.error("Error liking card:", error);
          });
      } else {
        api.removeLike(this._id)
          .then((data) => {
            console.log("Card unliked:", data);
          })
          .catch((error) => {
            console.error("Error unliking card:", error);
          });
      }
    });
  }

  _trash() {
    const trashButton = this._element.querySelector(".elements__trash");
    trashButton.addEventListener("click", () => {
      this._popupWithDelete.open(this._element, this._id);
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