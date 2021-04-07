import cards from "./cards.js";
import { drawCards } from "./functions.js";
import { gamePlay } from "./functions.js";
// import { startGame } from "./functions.js";
const containerRef = document.querySelector(".card-container");
let cardsAmount = 12;

document
  .querySelector(".count-cards__wrapper")
  .addEventListener("click", () => alert("В розробці"));
// .addEventListener("click", (event) => cardsAmount = +event.target.dataset.count);
document
  .querySelector(".start-btn")
  .addEventListener("click", () => alert("В розробці"));
// .addEventListener("click", startGame(cardsAmount, cards, containerRef));
// function startGame(cardsAmount, cards, containerRef) {
//   console.log('START');
//   containerRef.querySelectorAll(".card").forEach(card => {card.remove});
//   drawCards(cardsAmount, cards, containerRef);
//   const cardsRef = [...containerRef.querySelectorAll(".card")];
//   gamePlay(cardsRef);
// };
drawCards(cardsAmount, cards, containerRef);
const cardsRef = [...containerRef.querySelectorAll(".card")];
gamePlay(cardsRef);
