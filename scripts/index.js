import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForms.js";
import PopupWithDelete from "./PopupWithDelete.js";
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
  formAvatar,
  avatarImg
} from "./utils.js";
import { api } from "./Api.js";

let currentUserId = null;

api.getAppInfo()
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
    cardSection._items = cards;
    cardSection.render();
  })
  .catch((err) => {
    console.error("Erro ao carregar dados iniciais:", err);
  });

const popupSelector = ".popup_image";
const imageElement = document.querySelector(".popup__img-zoom");
const captionElement = document.querySelector(".popup__description");
const popupWithImage = new PopupWithImage(
  popupSelector,
  imageElement,
  captionElement,
  () => handleImageClick()
);
popupWithImage.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item, "#template-card", popupWithImage, popupDelete, currentUserId);
      const cardElement = newCard.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".elements__card"
);

const userInfo = new UserInfo(selectors);

const popupProfile = new PopupWithForm({
  popupSelector: ".popup",
  submitCallback: ({ name, about }, done) => {
    api
      .updateUser({
        name: name,
        about: about,
      })
      .then((user) => {
        userInfo.setUserInfo(user.name, user.about, user.avatar);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      }).finally(done);
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
  submitCallback: ({ name, image }, done) => {
    api
      .addCard({
        name: name,
        link: image,
      })
      .then((card) => {
        const newCard = new Card(card, "#template-card", popupWithImage, popupDelete, currentUserId);
        const cardElement = newCard.generateCard();
        document.querySelector(".elements__card").prepend(cardElement);
      })
      .catch((error) => {
        console.error("Error creating card:", error);
      }).finally(done);
  },
});
popupAddForm.setEventListeners();


openAddButton.addEventListener("click", () => {
  popupAddForm.open();
});

const popupDelete = new PopupWithDelete({
  popupSelector: ".popup-delete",
  submitCallback: (cardElement, cardId, done) => {
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      }).finally(done);
  },
});
popupDelete.setEventListeners();

// Popup avatar
const popupAvatar = new PopupWithForm({
  popupSelector: ".popup-avatar",
  submitCallback: ({ avatar }, done) => {
    api.updateAvatar({ avatar })
      .then((user) => {
        document.querySelector(".profile__img").src = user.avatar;
      })
      .catch((error) => {
        console.error("Error updating avatar:", error);
      }).finally(done);
  },
});
popupAvatar.setEventListeners();

avatarImg.addEventListener("click", () => {
  popupAvatar.open();
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

const formValidatorAvatar = new FormValidator(formConfig, formAvatar);
formValidatorAvatar.enableValidation();