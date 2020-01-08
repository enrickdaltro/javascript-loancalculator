// listen for submit
document
  .querySelector("#loan-form")
  .addEventListener("submit", calculateResults);

// calculate results
function calculateResults(e) {
  //UI vars
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  // take amount value and transform into a decimal
  const principal = parseFloat(amount.value);
  // take interest value and transform into a decimal
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  // take years value and transform into a decimal
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
  } else {
    showError("Please check your numbers");
  }
  e.preventDefault();
}

// show erros function
function showError(error) {
  // get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  // create a div
  const errorDiv = document.createElement("div");
  // add class
  errorDiv.className = "alert alert-danger";
  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // inser errot above heading
  card.insertBefore(errorDiv, heading);
  //clear error
  setTimeout(clearError, 2000);
}

// clear error function
function clearError() {
  document.querySelector(".alert").remove();
}
