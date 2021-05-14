//UI selector variables
const cost = document.querySelector("#cost");
const percentage = document.querySelector("#percentage");
const people = document.querySelector("#people");
const btn = document.querySelector("button");
const spinner = document.querySelector("#loader");
const results = document.querySelector("#Results");
const message = document.querySelector(".alert")

//Calculates and returns the tip as currency
function calculateTip() {
  let tip = (cost.value * (percentage.value / 100));
  return tip;
}

//Calculates total including tip (cost.value is read as a string from the html input)
function calculateTotal(tip) {
  let total = Number(cost.value) + tip;
  return total;
}

function calculatePerPerson(tip) {
  let person = (tip / people.value);
  return person;
}

//Hides the Spinner and displays the results
function displayResults() {
  spinner.style.display = "none";
  results.style.display = "block";
}

function showError() {
  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
  },2000)
}

function loadResults(e) {
  //Clear results first
  results.style.display = "none";
  //Works only if all the fields are filled in
  if(cost.value > 0 && people.value > 0
    && percentage.value > 0) {

  let tip = calculateTip();
  let total = calculateTotal(tip);
  let perPerson = calculatePerPerson(tip);

  //display the spinner
  spinner.style.display = "block";

  //call DisplayResults after 1 second
  setTimeout(displayResults, 1000);

  //Show the results in the disabled inputs 
  document.querySelector("#tip").value = `$${tip.toFixed(2)}`;
  document.querySelector("#amt").value = `$${total.toFixed(2)}`;
  document.querySelector('#person').value = `$${perPerson.toFixed(2)}`; 
  }
  //Display error message
  else {
    showError();
  } 
  //Prevent default form action
  e.preventDefault();
}

btn.addEventListener('click', loadResults);

//Hide results and warning from user at first
document.addEventListener("DOMContentLoaded", e => {
  spinner.style.display = "none";
  results.style.display = "none";
  message.style.display = "none";
  //Clears the form if the user refreshes the page
  document.querySelector("form").reset();
})
