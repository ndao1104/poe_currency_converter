const convertButton = document.getElementById("convert-button");

convertButton.addEventListener("click", function() {
    const chao = Number(document.getElementById("divine-amount").value) * 200;
    document.getElementById("result").textContent = `${chao} Chaos Orbs`;
});

