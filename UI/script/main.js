const selectedAmount = document.querySelector('.amountSelected');
const tenorSelected = document.querySelector('.selectedTenor');
const monthlyRepayment = document.querySelector('.monthlyRepayment');
const tenor = document.querySelector('#tenor');
const selected = document.querySelector('#displayTenor');
selected.innerHTML = tenor.value;
tenorSelected.innerHTML  = tenor.value;

tenor.oninput = function () {
  selected.innerHTML = this.value;
  tenorSelected.innerHTML = this.value;
  const monthlyInstallment = ((slider.value * 0.05) + Number(slider.value)) / tenor.value
  monthlyRepayment.innerHTML = monthlyInstallment.toFixed(2);
};
const slider = document.querySelector("#amount");
const output = document.querySelector("#displayAmount");
const errorDisplay = document.querySelector("#errorDisplay");
output.oninput = function () {
  if(output.value >= 1000000) {
    output.value = 1000000.00;
  }
  selectedAmount.innerHTML = output.value;
  const monthltyInstallment = ((Number(output.value) * 0.05) + Number(output.value)) / tenor.value;
  if(monthltyInstallment == NaN) {
    errorDisplay.innerHTML = 'Only Numeric values allowed';
  }
  monthlyRepayment.innerHTML = monthltyInstallment.toFixed(2);
}

slider.oninput = function() {
  output.value = this.value;
  selectedAmount.innerHTML = this.value;
  const monthltyInstallment = ((slider.value * 0.05) + Number(slider.value)) / tenor.value;
  monthlyRepayment.innerHTML = monthltyInstallment.toFixed(2);
}

const statusCheck = document.querySelector('#status-checkbox').getAttribute('checked');
const status = document.querySelector('#status');
statusCheck.oninput = function () {
    status.innerHTML = 'verified';
}


