import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor({ popupSelector, submitCallback }) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._formElement = this._popupElement.querySelector(".popup__form_delete");
    this._submitButton = this._formElement.querySelector(".popup__button-submit");
    this._defaultButtonText = this._submitButton.textContent;
    this._submitCallback = submitCallback;
  }

  open(cardElement, cardId) {
    this._cardElement = cardElement;
    this._cardId = cardId;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._renderSaving(true);
      this._submitCallback(
        this._cardElement,
        this._cardId,
        () => {
          this._renderSaving(false);
          this.close();
        }
      );
    });
  }

  _renderSaving(isSaving) {
    this._submitButton.textContent = isSaving ? "Salvando..." : this._defaultButtonText;
  }

  close() {
    super.close();
    this._renderSaving(false);
  }
}