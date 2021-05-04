import cards from "./cards.js";
import { startGame } from "./functions.js";
const refs = {};
refs.containerRef = document.querySelector(".card-container");
refs.settingsRef = document.querySelector(".settings");
refs.cardsAmount = 4;
refs.timerCount = 2;
refs.playerAmount = 0;
refs.gameType = "singlePlayer";

document
  .querySelector(".settings__type-wrapper")
  .addEventListener("click", () => {
    if (event.target.parentNode.classList.contains("settings__type")) {
      document
        .querySelector(".settings__type--active")
        .classList.remove("settings__type--active");
      event.target.parentNode.classList.add("settings__type--active");
      refs.gameType = event.target.parentNode.dataset.type;
    }
    if (!event.target.classList.contains("settings__type")) return;
    document
      .querySelector(".settings__type--active")
      .classList.remove("settings__type--active");
    event.target.classList.add("settings__type--active");
    refs.gameType = event.target.dataset.type;
  });
document
  .querySelector(".count-cards__wrapper")
  .addEventListener(
    "click",
    () => (refs.cardsAmount = +event.target.dataset.count)
  );
document
  .querySelector(".count-timer__wrapper")
  .addEventListener(
    "click",
    () => (refs.timerCount = +event.target.dataset.count)
  );
document.querySelector(".start-btn").addEventListener("click", function () {
  startGame(
    refs.cardsAmount,
    cards,
    refs.containerRef,
    refs.timerCount,
    refs.playerAmount,
    refs.gameType
  );
  refs.settingsRef.classList.add("hidden");
});
