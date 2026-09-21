const BASE__URL =
  "https://v6.exchangerate-api.com/v6/3168ef633ad75c91721e8ea9/latest";

const input = document.querySelector("#input__amount");
const selection = document.querySelectorAll("#selection");
const output = document.querySelector(".output");
const btn = document.querySelector(".exchange__btn");
const fromCurr = document.querySelector(".fromCurr");
const toCurr = document.querySelector(".toCurr");
const changeBtn = document.querySelector(".swap__icon");

for (let select of selection) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "BDT") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "USD") {
      newOption.selected = "selected";
    }

    select.appendChild(newOption);
  }

  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let imgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");

  img.src = imgSrc;
};

const exChange = function () {
  let tempCurr = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = tempCurr;

  updateFlag(fromCurr);
  updateFlag(toCurr);
  updateExchangeRate();
};

const updateExchangeRate = async function () {
  let amount = input.value;
  if (amount === 0 || amount < 1 || amount == "") {
    input.value = 1;
    amount = 1;
  }

  try {
    const URL = `${BASE__URL}/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let amountObj = data.conversion_rates;
    let finalAmount = amount * amountObj[toCurr.value];

    output.innerText = `${amount} ${fromCurr.value} = ${finalAmount.toFixed(6)} ${toCurr.value}`;
  } catch {
    output.innerText = "Somethings went wrong! Please try again later.";
  }
};

btn.addEventListener("click", updateExchangeRate);
window.addEventListener("load", updateExchangeRate);
window.addEventListener("load", exChange);
