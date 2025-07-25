import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageElement, captionElement) {
    super(popupSelector);
    this._imageElement = imageElement;
    this._captionElement = captionElement;
  }

  open(image, name) {
    super.open();
    this._imageElement.src = image;
    this._captionElement.textContent = name;
  }
}
