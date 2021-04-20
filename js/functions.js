// генерує в випадкові послідовності картки (приймає кількість карток, масив карток та посилання куди вставити картки)
export const drawCards = (amount, cards, containerRef) => {
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
          let string = `<div class="card card-${card.id}" data-id='${card.id}' ><div class="default" ></div><img class="card__photo" src="${card.src}" alt="${card.description}"></div>`;
          containerRef.insertAdjacentHTML("beforeend", string);
          setOfCards.splice(setOfCards.indexOf(random), 1);
        }
      }
    }
  }
};

// починає гру на заданих картках (приймає масив карток)
export const gamePlay = (cards) => {
  const state = { ref: "", id: 0, position: 1, gameState: 0 };
  const compareCard = (event) => {
    if (state.position === 2) {
      event.target.classList.add("choosed");
      state.position = 1;
      const repairCards = function () {
        this.ref.querySelector("img").classList.remove("choosed");
        event.target.classList.remove("choosed");
        cards.forEach((card) => card.addEventListener("click", compareCard));
      };
      if (event.currentTarget.dataset.id === state.id) {
        event.currentTarget.removeEventListener("click", compareCard);
        state.position = 1;
        event.currentTarget.querySelector("img").classList.add("choosed");
        event.currentTarget.classList.add("hidden");
        state.ref.classList.add("hidden");
        event.currentTarget.classList.add("choosed");
        state.gameState++;
        if (state.gameState === cards.length / 2) {
          endGame();
        }
      }
      if (event.currentTarget.dataset.id !== state.id) {
        event.currentTarget.classList.add("choosed");
        cards.forEach((card) => card.removeEventListener("click", compareCard));
        state.currentTarget = event.currentTarget;
        setTimeout(repairCards.bind(state), 500);
      }
    } else if (state.position === 1) {
      state.position = 2;
      state.ref = event.currentTarget;
      state.id = event.currentTarget.dataset.id;
      event.currentTarget.removeEventListener("click", compareCard);
      event.currentTarget.querySelector("img").classList.add("choosed");
      event.target.classList.add("choosed");
    }
  };
  cards.forEach((card) => card.addEventListener("click", compareCard));
};

// розпочинає гру із заданими параметрами

export const startGame = (cardsAmount, cards, containerRef) => {
  drawCards(cardsAmount, cards, containerRef);
  const cardsRef = [...containerRef.querySelectorAll(".card")];
  gamePlay(cardsRef);
  containerRef.querySelectorAll(".card").forEach((card) => {
    card.remove();
  });
};

// закінчує гру
const endGame = () => {
  alert("you won");
};
