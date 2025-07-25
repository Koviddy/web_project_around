import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitCallback}) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._submitCallback = submitCallback;   
    this._formElement =  this._popupElement.querySelector(".popup__form");
    this._submitButton = this._formElement.querySelector(".popup__button-submit");
    this._defaultButtonText = this._submitButton.textContent;
  }


  _getInputValues() {
    const inputs = this._formElement.querySelectorAll(".popup__form-input");

    const values = {};

    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  setInputValues(values) {
    const inputs = this._formElement.querySelectorAll(".popup__form-input");
    inputs.forEach((input) => {
      input.value = values[input.name];
    });
  }
  
  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._renderSaving(true);
      this._submitCallback(
        this._getInputValues(),
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
    this._formElement.reset();
    this._renderSaving(false);
  }
}