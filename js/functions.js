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
          let string = `<div class="card card-${card.id}"><div class="default" ></div><img class="card__photo" src="${card.src}" alt="${card.description}" data-id='${card.id}'></div>`;
          containerRef.insertAdjacentHTML("beforeend", string);
          setOfCards.splice(setOfCards.indexOf(random), 1);
        }
      }
    }
  }
};

// починає гру на заданому контейнері карток (контейнер карток)
export const gamePlay = (container) => {
  const state = { ref: "", id: 0, position: 1, gameState: 0, blocked: false };
  const compareCard = () => {
    if (state.blocked) return;
    if (event.target.parentNode.classList.contains("hidden")) return;
    if (state.position === 2) {
      if (state.ref === event.target) return;
      if (state.ref.dataset.id === event.target.dataset.id) {
        state.position = 1;
        state.ref.classList.add("choosed");
        event.target.parentNode.classList.add("hidden");
        state.ref.parentNode.classList.add("hidden");
        state.gameState++;
        if (state.gameState === container.children.length / 2) {
          endGame();
        }
      } else {
        event.target.classList.add("choosed");
        state.position = 1;
        state.blocked = true;
        const repairCard = (event) => {
          event.target.classList.remove("choosed");
          state.ref.classList.remove("choosed");
          state.blocked = false;
        };
        setTimeout(repairCard, 1000, event);
      }
    } else if (state.position === 1) {
      state.ref = event.target;
      state.position = 2;
      event.target.classList.add("choosed");
    }
  };
  container.addEventListener("click", compareCard);
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
