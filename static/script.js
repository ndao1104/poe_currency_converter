const convertButton = document.getElementById("convert-button");
let divineToChao;

fetch("/api/leagues")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

fetch("/api/currency")
  .then((response) => response.json())
  .then((data) => {
    divineToChao = data.lines.find(
      (line) => line.currencyTypeName === "Divine Orb",
    );
    console.log(divineToChao);
    fetch("api/cards")
      .then((response) => response.json())
      .then((data) => {
        knownCards.forEach((card) => {
          const priceLine = data.lines.find((line) => line.id === card.id);
          const stackCost = priceLine.primaryValue * card.stackSize;
          const rewardValue = card.rewardDivines * divineToChao.chaosEquivalent;
          const profit = rewardValue - stackCost;

          const row = document.createElement("tr");
          row.innerHTML = `
          <td>${card.name}</td>
          <td><input type="number" class="price-input" value="${priceLine.primaryValue.toFixed(1)}"></td>
          <td class="stack-cost-cell">${stackCost.toFixed(1)}</td>
          <td>${rewardValue.toFixed(1)}</td>
          <td class="profit-cell">${profit.toFixed(1)}</td>
          `;
          document.getElementById("card-table-body").appendChild(row);

          const priceInput = row.querySelector(".price-input");
          priceInput.addEventListener("input", function () {
            const newPrice = Number(priceInput.value);
            const newStackCost = newPrice * card.stackSize;
            const newProfit = rewardValue - newStackCost;

            row.querySelector(".stack-cost-cell").textContent =
              newStackCost.toFixed(1);
            row.querySelector(".profit-cell").textContent =
              newProfit.toFixed(1);
          });
        });
      });
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

convertButton.addEventListener("click", function () {
  const chao =
    Number(document.getElementById("divine-amount").value) *
    divineToChao.chaosEquivalent;
  document.getElementById("result").textContent = `${chao} Chaos Orbs`;
});
