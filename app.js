// listen for submit

document.querySelector('#loan-form').addEventListener('submit', calculateResults);

// calculate results

function calculateResults(e) {
  console.log('Calculating . . .')

  const UIammount = document.querySelector('#ammount');
  const UIinterest = document.querySelector('#interest');
  const UIyears = document.querySelector('#years');
  const UImonthlyPay = document.querySelector('#monthly-payment');
  const UItotalPay = document.querySelector('#total-payment');
  const UItotalInterest = document.querySelector('#total-interest');

  // principal = ammount 
  const principal = parseFloat(UIammount.value);
  const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(UIyears.value) * 12;
  
  //compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if(isFinite(monthly)){
    UImonthlyPay.value = monthly.toFixed(2);
    UItotalPay.value = (monthly * calculatedPayments).toFixed(2);
    UItotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
  } else {
    showError('Please check your numbers');
  }

  e.preventDefault();
}

function showError(error) {

  // get element
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // create div
  const errorDiv = document.createElement('div');

  // add clas
  errorDiv.className = 'alert alert-danger';

  // create text node and aappend
  errorDiv.appendChild(document.createTextNode(error));

  //insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3 sc
  setTimeout(clearError, 3000);

}

function clearError() {
  document.querySelector('.alert').remove();
}