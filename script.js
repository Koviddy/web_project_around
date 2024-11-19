let editButton = document.querySelector("#edit__Button"); // Botão para abrir o modal
let modal = document.querySelector("#profileModal"); // Modal
let closeButton = document.querySelector(".modal__close-button"); // Botão para fechar o modal
let saveButton = document.querySelector(".modal-content");
let hearts = document.querySelectorAll(".card-heart");

function openModal() {
  modal.classList.add("modal--active");
}

function closeModal() {
  modal.classList.remove("modal--active");
}

editButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

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
