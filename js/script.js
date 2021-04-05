import cards from "./cards.js";
const containerRef = document.querySelector(".card-container");
const cardsAmount = 12;
const drawCards = function (amount, cards) {
  let collection = [];
  while (!(collection.length === amount)) {
    let random = Math.ceil(Math.random() * cards.length);
    if (!collection.includes(random)) {
      collection.push(random);
    }
    if (collection.length === amount / 2) {
      collection = [...collection, ...collection];
      let setOfCards = collection.slice();
      while (!(setOfCards.length === 0)) {
        random = Math.ceil(Math.random() * cards.length);
        if (setOfCards.includes(random)) {
          let card = cards.find((card) => card.id === random);
          let string = `<div class="card card-${card.id} default" style="background-color: ${card.color};"><img src="${card.src}" alt="${card.description}"></div>`;
          containerRef.insertAdjacentHTML("beforeend", string);
          setOfCards.splice(setOfCards.indexOf(random), 1);
        }
      }
    }
  }
};
drawCards(cardsAmount, cards);
const cardsRef = [...containerRef.querySelectorAll(".card")];
const gamePlay = function (cards) {
  const state = { ref: "", id: 0 };
  const compareCard = function (event) {
    if
    console.log(cards.length === 0);
    event.currentTarget.classList.add("default");
    console.log(event.currentTarget);
  };
  cards.forEach((card) => card.addEventListener("click", compareCard));
};
gamePlay(cardsRef);
