import cards from "./cards.js";
const containerRef = document.querySelector(".card-container");
console.log(containerRef);
console.log(cards);
let cardsAmount = 16;
function drawCards() {
  let colection = [];
  while (colection.length * 2 === cardsAmount) {
    cards.forEach(card => {

    })
  }
  // Math.round(Math.random() * cards.length);
}
drawCards();