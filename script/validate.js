function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
}

function getErrorMessage(inputElement) {
  if (inputElement.validity.valueMissing) {
    return "Preencha esse campo.";
  }
  if (inputElement.validity.tooShort) {
    return `Use ${inputElement.minLength} caracteres ou mais.`;
  }
  if (inputElement.validity.tooLong) {
    return `Use ${inputElement.maxLength} caracteres ou menos.`;
  }
  if (inputElement.validity.typeMismatch && inputElement.type === "url") {
    return "Por favor, insira um endereço web.";
  }
  return inputElement.validationMessage; // Mensagem padrão
}

function checkInputValidity(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    const errorMessage = getErrorMessage(inputElement);
    showInputError(formElement, inputElement, errorMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, settings) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  // Atualiza o estado do botão ao abrir o popup
  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });

  formElement.addEventListener("reset", () => {
    setTimeout(() => {
      inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, settings);
      });
      toggleButtonState(inputList, buttonElement, settings);
    }, 0);
  });
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, settings);
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
});