const convertButton = document.getElementById("convert-button");
let divineLine;
let theFortunate;
let divineBeauty;
let theSephirot;

fetch("/api/leagues")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

fetch("/api/currency")
  .then((response) => response.json())
  .then((data) => {
    divineLine = data.lines.find(
      (line) => line.currencyTypeName === "Divine Orb",
    );
    console.log(divineLine);
  });

const knownCards = [
  {
    id: "the-fortunate",
    name: "The Fortunate",
    stackSize: 12,
    rewardDivines: 2,
  },
  {
    id: "divine-beauty",
    name: "Divine Beauty",
    stackSize: 12,
    rewardDivines: 7,
  },
  {
    id: "the-sephirot",
    name: "The Sephirot",
    stackSize: 11,
    rewardDivines: 10,
  },
];

fetch("api/cards")
  .then((response) => response.json())
  .then((data) => {
    theFortunate = data.lines.find((line) => line.id === "the-fortunate");
    divineBeauty = data.lines.find((line) => line.id === "divine-beauty");
    theSephirot = data.lines.find((line) => line.id === "the-sephirot");

    array.forEach((card) => {
      const priceLine = data.lines.find((line) => line.id === card.id);
      console.log(card.id, priceLine);
    });
  });

convertButton.addEventListener("click", function () {
  const chao =
    Number(document.getElementById("divine-amount").value) *
    divineLine.chaosEquivalent;
  document.getElementById("result").textContent = `${chao} Chaos Orbs`;
});
