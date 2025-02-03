let editButton = document.querySelector("#edit__Button"); // Botão para abrir o modal
let modal = document.querySelector("#profileModal"); // Modal edit
let addModal = document.querySelector("#addModal");
let closeButtons = document.querySelectorAll(".modal__close-button"); // Botão para fechar o modal
let saveButton = document.querySelector(".modal-content");
let hearts = document.querySelectorAll(".card-heart");
let bins = document.querySelectorAll("card__bin");
let addButton = document.querySelector("#add__Button");
let cardGrid = document.querySelector(".card-grid");

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function openModal(modalType) {
  if (modalType == "edit") {
    modal.classList.add("modal--active");
  } else {
    addModal.classList.add("modal--active");
  }
}

function closeModal() {
  modal.classList.remove("modal--active");
  addModal.classList.remove("modal--active");
}

editButton.addEventListener("click", () => openModal("edit"));

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

addButton.addEventListener("click", openModal);

hearts.forEach((heart) =>
  heart.addEventListener("click", () => {
    heart.classList.toggle("active");
  })
);

function submitModal(event) {
  event.preventDefault();
  let nameInput = document.querySelector("#nameInput");
  let jobInput = document.querySelector("#jobInput");

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  let nameElement = document.querySelector(".profile__name");
  let jobElement = document.querySelector(".profile__function");

  nameElement.textContent = nameValue;
  jobElement.textContent = jobValue;

  console.log(nameValue);
  closeModal();
}

saveButton.addEventListener("submit", submitModal);

function createCard(cardData) {
  const cardTemplate = document
    .querySelector("#card__template")
    .content.querySelector(".card__template")
    .cloneNode(true);

  const cardImage = cardTemplate.querySelector(".card__image");
  const cardTitle = cardTemplate.querySelector(".card-title");
  const cardHeart = cardTemplate.querySelector(".card-heart");
  const cardBin = cardTemplate.querySelector(".card__bin");
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardHeart.addEventListener("click", () => {
    cardHeart.classList.toggle("active");
  });

  cardBin.addEventListener("click", () => {
    cardTemplate.remove();
  });

  cardImage.addEventListener("click", () => {
    openImageModal(cardData);
  });

  return cardTemplate;
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardGrid.appendChild(cardElement);
}

function postCard(evt) {
  evt.preventDefault();

  let linkInput = document.querySelector("#linkInput");
  let titleInput = document.querySelector("#titleInput");

  let linkValue = linkInput.value;
  let titleValue = titleInput.value;

  const newCard = {
    name: titleValue,
    link: linkValue,
  };

  renderCard(newCard);
  addForm.reset();
}

addForm.addEventListener("submit", (event) => {
  postCard(event);
});

initialCards.forEach((card) => {
  renderCard(card);
});

function openImageModal(cardData) {
  const zoomImageContainer = document
    .querySelector("#zoom__Template")
    .content.querySelector(".zoom__Template_card")
    .cloneNode(true);

  const zoomImage = zoomImageContainer.querySelector(".zoom__pic");
  const zoomText = zoomImageContainer.querySelector(".zoom__text");
  const zoomClose = zoomImageContainer.querySelector("#closeImage");

  zoomImageContainer.classList.add("active");

  zoomText.textContent = cardData.name;
  zoomImage.src = cardData.link;

  document.body.appendChild(zoomImageContainer);

  zoomClose.addEventListener("click", () => zoomImageContainer.remove());
}
