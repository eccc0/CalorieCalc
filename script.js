const CalorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");

let isError = false;

function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Insira o ${entryNumber} nome</label>
  <input type="text" placeholder="Nome" id="${entryDropdown.value}-${entryNumber}-name">
  <label for="${entryDropdown.value}-${entryNumber}-calories">Insira ${entryNumber} calorias</label>
  <input type="number" min="0" placeholder="Calorias" id="${entryDropdown.value}-${entryNumber}-calories">
  `;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

function getCaloriesFromInputs(list) {
  let calories = 0;
  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);
    if (invalidInputMatch) {
      alert(`Entrada inválida: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

function calculateCalories(e) {
  e.preventDefault();
  isError = false;
  const breakfastNumberInputs = document.querySelectorAll(
    "#breakfast input[type=number"
  );
  const lunchNumberInputs = document.querySelectorAll(
    "#lunch input[type-number]"
  );
  const dinnerNumberInputs = document.querySelectorAll(
    "#dinner input[type-number]"
  );
  const snacksNumberInputs = document.querySelectorAll(
    "#snacks input[type-number]"
  );
  const exerciseNumberInputs = document.querySelectorAll(
    "#exercise input[type-number]"
  );
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  if (isError) {
    return;
  }
  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;

  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? "Excedente(s)" : "em Deficit";

  output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Caloria(s) ${surplusOrDeficit}</span>
  
  <hr>
  <p>${budgetCalories} Caloria(s) contabilizada(s)</p>
  <p>${consumedCalories} Calorias(s) consumida(s)</p>
  <p>${exerciseCalories} Caloria(s) queimada(s)</p>
  `;
  output.classList.remove('hide');
}

function clearForm(){
  const inputContainers  = Array.from(document.querySelectorAll('.input-container'));

  for(const container of inputContainers){
    container.innerHTML = '';
  }
budgetNumberInput.value = '';
output.innerText = '';
output.classList.add('hide');
}

addEntryButton.addEventListener("click", addEntry);
CalorieCounter.addEventListener("submit", calculateCalories)
clearButton.addEventListener("click", clearForm);