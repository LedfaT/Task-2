"use strict";

let images = Array.from(document.querySelectorAll(".img"));
console.log(images);
const infomation = document.querySelector(".information");
const main = document.querySelector(".main__images");
const btnClose = document.querySelector(".close-button");
const btnDelete = document.querySelector(".delete-button");
const btnRecover = document.querySelector(".recovery-button");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const now = new Date();
const initHTML = `  <div class="menu__img">
          <img src="img/1-small.jpg" data-num="1" alt="" class="img" />
        </div>

        <div class="menu__img">
          <img src="img/2-small.jpg" data-num="2" alt="" class="img" />
        </div>

        <div class="menu__img">
          <img src="img/3-small.jpg" data-num="3" alt="" class="img" />
        </div>

        <div class="menu__img">
          <img src="img/4-small.jpg" data-num="4" alt="" class="img" />
        </div>

        <div class="menu__img">
          <img src="img/5-small.jpg" data-num="5" alt="" class="img" />
        </div>
        <div class="menu__img">
          <img src="img/6-small.jpg" data-num="6" alt="" class="img" />
        </div>

        <div class="menu__img">
          <img src="img/7-small.jpg" data-num="7" alt="" class="img" />
        </div>
        <div class="menu__img">
          <img src="img/8-small.jpg" data-num="8" alt="" class="img" />
          </div>
          
          <div class="menu__img">
          <img src="img/9-small.jpg" data-num="9" alt="" class="img" />
          </div>
          
          <div class="menu__img">
          <img src="img/10-small.jpg" data-num="10" alt="" class="img" />
          </div>
          
          <div class="menu__img">
          <img src="img/11-small.jpg" data-num="11" alt="" class="img" />
          </div>
          
          <div class="menu__img">
          <img src="img/12-small.jpg" data-num="12" alt="" class="img" />
          </div>`;

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
    `<p>number of images is ${document.querySelectorAll(".img").length}</p>
                <p>${new Intl.DateTimeFormat(
                  navigator.language,
                  optionsDate
                ).format(now)}</p>
                
                <p>${new Intl.DateTimeFormat(
                  navigator.language,
                  optionsTime
                ).format(now)}</p>`
  );
};
const render = function () {
  main.innerHTML = "";
  images.forEach(function (img, i) {
    const val = img.dataset.num;
    main.insertAdjacentHTML(
      "beforeend",
      ` <div class="menu__img">
                    <img src="img/${val}.jpg" data-num="${val}" alt="" class="img" /> 
                 <button class="delete-button">&times;</button>
                </div>
                   `
    );
  });
  printCurrentTime();
};

const setLocalStorage = function () {
  const imageData = images.map((img) => ({
    src: img.src,
    num: img.dataset.num,
  }));
  localStorage.setItem("images", JSON.stringify(imageData));
};

const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem("images"));
  if (!data) return;
  images = data.map((imgData) => {
    const imgElement = document.createElement("img");
    imgElement.src = imgData.src;
    imgElement.dataset.num = imgData.num;
    imgElement.alt = "";
    imgElement.classList.add("img");
    return imgElement;
  });
};

const init = function () {
  getLocalStorage();
  render();
};

init();

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

[overlay, btnClose].forEach((el) => el.addEventListener("click", closeModal));

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

main.addEventListener("click", function (e) {
  if (!e.target.matches(".delete-button")) return;

  const imgContainer = e.target.closest(".menu__img");
  const img = imgContainer.querySelector("img");

  const imgIndex = images.findIndex(
    (image) => image.dataset.num === img.dataset.num
  );

  if (imgIndex !== -1) {
    images.splice(imgIndex, 1);
  }

  imgContainer.remove();

  render();

  setLocalStorage();

  printCurrentTime();
});

const recover = function () {
  main.innerHTML = "";
  main.insertAdjacentHTML("beforeend", initHTML);

  images = Array.from(document.querySelectorAll(".img"));

  setLocalStorage();

  render();
};

btnRecover.addEventListener("click", function (e) {
  recover();
});
