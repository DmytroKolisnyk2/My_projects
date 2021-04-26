import cards from "./cards.js";
import { startGame } from "./functions.js";
const refs = {};
refs.containerRef = document.querySelector(".card-container");
refs.cardsAmount = 12;
refs.timerCount = 60;
document
  .querySelector(".count-cards__wrapper")
  .addEventListener("click", () => (cardsAmount = +event.target.dataset.count));
document
  .querySelector(".count-timer__wrapper")
  .addEventListener(
    "click",
    () => (refs.timerCount = +event.target.dataset.count)
  );
document.querySelector(".start-btn").addEventListener("click", function () {
  startGame(refs.cardsAmount, cards, refs.containerRef, refs.timerCount);
});