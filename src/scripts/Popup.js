export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
  }
  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popupElement
      .querySelector(".popup__close-icon-img")
      .addEventListener("click", this.close);
    function onClick(evt) {
      evt.target.classList.remove("popup_opened");
    }
    this._popupElement.addEventListener("click", onClick);
  }
}