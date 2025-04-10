import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForms.js";  
import Section from "./Section.js";
import { initialCards } from "./utils.js";
import UserInfo from "./UserInfo.js";
import {
  formAdd,
  formProfileElement,
  openFormButton,
  inputName,
  inputAbout,
  openAddButton,
  selectors,
} from "./utils.js";

const popupSelector = ".popup_image";
const imageElement = document.querySelector(".popup__img-zoom");
const captionElement = document.querySelector(".popup__description");
const popupWithImage = new PopupWithImage(popupSelector, imageElement, captionElement, () => handleImageClick());
popupWithImage.setEventListeners();


const cardSection = new Section({
      items: initialCards,
      renderer: (item) => {
        const newCard = new Card(item, "#template-card", popupWithImage);
      const cardElement = newCard.generateCard(); 
      cardSection.addItem(cardElement); 
    },
  },
  ".elements__card"
);
cardSection.render();

const userInfo = new UserInfo(selectors);

const popupProfile = new PopupWithForm({
  popupSelector: ".popup",
  submitCallback: ({ name , about }) =>
  {
    userInfo.setUserInfo(name, about);
  },
});
popupProfile.setEventListeners();

openFormButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  inputName.value = name;
  inputAbout.value = about;
  popupProfile.open();
});

const popupAddForm = new PopupWithForm({
  popupSelector: ".popup-add",
  submitCallback: () => {
    const dataCard = {
      name: document.querySelector(".popup__form-input_title").value,
      image: document.querySelector(".popup__form-input_link").value,
    };
    const newCard = new Card(dataCard, "#template-card", popupWithImage);
    const cardElement = newCard.generateCard();
    document.querySelector(".elements__card").prepend(cardElement);
  },
});
popupAddForm.setEventListeners();
openAddButton.addEventListener("click", () => {
  popupAddForm.open();
});

const formConfig = {
  formSelector: ".popup__form_add",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formValidatorAdd = new FormValidator(formConfig, formAdd);
formValidatorAdd.enableValidation();

const formValidatorProfile = new FormValidator(formConfig, formProfileElement); 
formValidatorProfile.enableValidation();