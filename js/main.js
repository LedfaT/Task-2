"use strict";

const images = document.querySelectorAll("img");
const infomation = document.querySelector(".information");
const now = new Date();

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
