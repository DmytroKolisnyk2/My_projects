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
          let string = `<div class="card card-${card.id} default" data-id='${card.id}' style="background-color: ${card.color};"><img src="${card.src}" alt="${card.description}"></div>`;
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
  const state = { ref: "", id: 0, position: 1 };
  const compareCard = function (event) {
    if (state.position === 2) {
      state.position = 1;
      console.log(state);
      console.log(cardsRef);
      const repairCards = function () {
        state.ref.classList.remove("active");
        state.currentTarget.classList.remove("active");
        state.ref.addEventListener("click", compareCard);
        state.currentTarget.addEventListener("click", compareCard);
      };
      if (event.currentTarget.dataset.id === state.id) {
        event.currentTarget.removeEventListener("click", compareCard);
        state.position = 1;
        console.log(event.currentTarget);
        event.currentTarget.querySelector("img").classList.add("active");
        event.currentTarget.classList.add("active");
        console.log(1);
        // console.log(cardsRef.indexOf({ ...event.currentTarget }));
        // cardsRef.splice(cardsRef.indexOf(event.currentTarget), 1);
        // cardsRef.splice(state.ref.indexOf(event.currentTarget), 1);
      }
      if (event.currentTarget.dataset.id !== state.id) {
        console.log(0);
        event.currentTarget.classList.add("active");
        event.currentTarget.removeEventListener("click", compareCard);
        state.currentTarget = event.currentTarget;
        console.log(state.event);
        setTimeout(repairCards.bind(state), 500);
      }
    } else if (state.position === 1) {
      console.log(state);
      console.log(event.currentTarget);
      state.position = 2;
      state.ref = event.currentTarget;
      state.id = event.currentTarget.dataset.id;
      event.currentTarget.removeEventListener("click", compareCard);
      event.currentTarget.querySelector("img").classList.add("active");
      event.currentTarget.classList.add("active");
    }
  };
  cards.forEach((card) => card.addEventListener("click", compareCard));
};
gamePlay(cardsRef);
