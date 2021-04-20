import cards from "./cards.js";
import { drawCards } from "./functions.js";
import { gamePlay } from "./functions.js";
import { startGame } from "./functions.js";
const containerRef = document.querySelector(".card-container");
let cardsAmount = 6;
document
  .querySelector(".count-cards__wrapper")
  .addEventListener(
    "click",
    (() => {
      cardsAmount = +event.target.dataset.count;
    console.log(cardsAmount);}).bind(cardsAmount)
  );
document
  .querySelector(".start-btn")
  .addEventListener("click", startGame(cardsAmount, cards, containerRef));
// function startGame(cardsAmount, cards, containerRef) {
//   console.log("START");
//   containerRef.querySelectorAll(".card").forEach((card) => {
//     card.remove;
//   });
//   drawCards(cardsAmount, cards, containerRef);
//   const cardsRef = [...containerRef.querySelectorAll(".card")];
//   gamePlay(cardsRef);
// }
drawCards(cardsAmount, cards, containerRef);
const cardsRef = [...containerRef.querySelectorAll(".card")];
gamePlay(cardsRef);
