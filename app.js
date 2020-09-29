// listen for submit

document.querySelector('#loan-form').addEventListener('submit', (e) => {
  //hide results
  document.querySelector('#results').style.display = 'none';
  // show loader
  document.querySelector('#loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// calculate results

function calculateResults() {
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
    //show results, hide loading
    document.querySelector('#results').style.display = 'block';
    document.querySelector('#loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

function showError(error) {
  document.querySelector('#results').style.display = 'none';
  document.querySelector('#loading').style.display = 'none';

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