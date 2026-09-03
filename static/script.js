const convertButton = document.getElementById("convert-button");



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

function fetchLeagues() {
  fetch("/api/leagues")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("league-result").textContent = `Current league: ${data[0].name}`;
    });
}

let divineToChao;
function fetchCurrency() {
  fetch("/api/currency")
    .then((response) => response.json())
    .then((data) => {
      divineToChao = data.lines.find(
        (line) => line.currencyTypeName === "Divine Orb",
      );
      document.getElementById("currency-result").textContent = `1 Divine Orb = ${divineToChao.chaosEquivalent.toFixed(0)} Chaos Orbs`;
      document.getElementById("fetch-cards-button").disabled = false;
    });

}

function fetchCards() {
  fetch("api/cards")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("card-table-body").innerHTML = "";
      knownCards.forEach((card) => {
        const priceLine = data.lines.find((line) => line.id === card.id);
        const stackCost = priceLine.primaryValue * card.stackSize;
        const rewardValue = card.rewardDivines * divineToChao.chaosEquivalent;
        const profit = rewardValue - stackCost;
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${card.name}</td>
          <td><input type="number" class="price-input" value="${priceLine.primaryValue.toFixed(0)}"></td>
          <td>${card.stackSize}</td>
          <td>${card.rewardDivines}</td>
          <td class="stack-cost-cell">${stackCost.toFixed(0)}</td>
          <td>${rewardValue.toFixed(0)}</td>
          <td class="profit-cell">${profit.toFixed(0)}</td>
          `;
        document.getElementById("card-table-body").appendChild(row);

        const priceInput = row.querySelector(".price-input");
        priceInput.addEventListener("input", function () {
          const newPrice = Number(priceInput.value);
          const newStackCost = newPrice * card.stackSize;
          const newProfit = rewardValue - newStackCost;

          row.querySelector(".stack-cost-cell").textContent =
            newStackCost.toFixed(0);
          row.querySelector(".profit-cell").textContent =
            newProfit.toFixed(0);
        });
      });
    });
}

convertButton.addEventListener("click", function () {
  const chao =
    Number(document.getElementById("divine-amount").value) *
    divineToChao.chaosEquivalent.toFixed(0);
  document.getElementById("result").textContent = `${chao} Chaos Orbs`;
});

document.getElementById("fetch-leagues-button").addEventListener("click", fetchLeagues);
document.getElementById("fetch-currency-button").addEventListener("click", fetchCurrency);
document.getElementById("fetch-cards-button").addEventListener("click", fetchCards);
