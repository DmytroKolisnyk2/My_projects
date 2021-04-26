// генерує в випадкові послідовності картки (приймає кількість карток, масив карток та посилання куди вставити картки)
const drawCards = (amount, cards, containerRef) => {
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
          let string = `<div class="card card-${card.id}"><img src='./img/card-down.png' class="card__back" ><img class="card__photo" src="${card.src}" alt="${card.description}" data-id='${card.id}'></div>`;
          containerRef.insertAdjacentHTML("beforeend", string);
          setOfCards.splice(setOfCards.indexOf(random), 1);
        }
      }
    }
  }
};

// починає гру на заданому контейнері карток (контейнер карток)
const gamePlay = (container) => {
  const state = { ref: "", id: 0, position: 1, gameState: 0, blocked: false };
  const compareCard = () => {
    if (state.blocked) return;
    if (event.target === container) return;
    event.target.classList.add("choosed");
    event.target.previousSibling.classList.add("flip");
    if (state.position === 2) {
      if (state.ref === event.target) return;
      if (state.ref.dataset.id === event.target.dataset.id) {
        state.position = 1;
        state.blocked = true;
        const removeCards = (event) => {
          event.target.classList.add("scaled");
          state.ref.classList.add("scaled");
          event.target.parentNode.classList.add("hidden");
          state.ref.parentNode.classList.add("hidden");
          state.blocked = false;
        };
        setTimeout(removeCards, 400, event);
        state.gameState++;
        if (state.gameState === container.children.length / 2) {
          setTimeout(endGame, 500);
        }
      } else {
        state.position = 1;
        state.blocked = true;
        const repairCard = (event) => {
          event.target.classList.remove("choosed");
          state.ref.classList.remove("choosed");
          event.target.previousSibling.classList.remove("flip");
          state.ref.previousSibling.classList.remove("flip");
          state.blocked = false;
        };
        setTimeout(repairCard, 800, event);
      }
    } else if (state.position === 1) {
      state.ref = event.target;
      state.position = 2;
    }
  };
  container.addEventListener("click", compareCard);
};

// розпочинає гру із заданими параметрами

export const startGame = (cardsAmount, cards, containerRef, timerCount) => {
  containerRef.querySelectorAll(".card").forEach((card) => {
    card.remove();
  });
  const timerRef = document.querySelector(".timer");
  const minutesRef = document.querySelector(".timer__minutes");
  const secondsRef = document.querySelector(".timer__seconds");
  timerRef.classList.remove("hidden");
  setTimeout(timer, 1000, timerCount, minutesRef, secondsRef);
  drawCards(cardsAmount, cards, containerRef);
  gamePlay(containerRef);
};

// закінчує гру
const endGame = () => {
  alert("you won");
};
const timer = (timerCount, minutesRef, secondsRef) => {
  let minutes = (timerCount / 60) % 60;
  let seconds = timerCount % 60 < 10 ? `0${timerCount % 60}` : timerCount % 60;
  // let seconds = timerCount % 60;
  if (timerCount <= 0) {
    clearInterval(timer);
    endGame();
  } else {
    timerCount--;
    minutesRef.innerHTML = Math.floor(minutes);
    secondsRef.innerHTML = seconds;
    setTimeout(timer, 1000, timerCount, minutesRef, secondsRef);
  }
};
