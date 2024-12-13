"use strict";

const images = document.querySelectorAll(".img");
const infomation = document.querySelector(".information");
const main = document.querySelector(".main__images");
const btnClose = document.querySelector(".close-button");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const now = new Date();

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  btnClose.classList.add("hidden");
};

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  btnClose.classList.remove("hidden");
};

const printCurrentTime = function () {
  infomation.innerHTML = "";

  const optionsDate = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const optionsTime = {
    hour: "numeric",
    minute: "numeric",
  };

  infomation.insertAdjacentHTML(
    "beforeend",
    `<p>number of images is ${images.length}</p>
      <p>${new Intl.DateTimeFormat(navigator.language, optionsDate).format(
        now
      )}</p>
      
      <p>${new Intl.DateTimeFormat(navigator.language, optionsTime).format(
        now
      )}</p>`
  );
};

printCurrentTime();

main.addEventListener("click", function (e) {
  if (!e.target.matches("img")) return;
  const imgNum = e.target.dataset.num;
  modal.innerHTML = "";
  modal.insertAdjacentHTML(
    "beforeend",
    `<img src="img/${imgNum}.jpg" alt="" class="modal-img" />`
  );

  openModal();
});

[overlay, btnClose].forEach((el) => el.addEventListener("click", closeModal));
