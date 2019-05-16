const selectedAmount = document.querySelector('.amountSelected');
const tenorSelected = document.querySelector('.selectedTenor');
const monthlyRepayment = document.querySelector('.monthlyRepayment');
const tenor = document.querySelector('#tenor');
console.log(tenor)
const selected = document.querySelector('#displayTenor');
selected.innerHTML = tenor.value;
tenorSelected.innerHTML  = tenor.value;

tenor.oninput = function () {
  selected.innerHTML = this.value;
  tenorSelected.innerHTML = this.value;
  monthlyRepayment.innerHTML = ((slider.value * 0.05) + Number(slider.value)) / tenor.value
};
const slider = document.querySelector("#amount");
const output = document.querySelector("#displayAmount");
output.innerHTML = slider.value;
selectedAmount.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  selectedAmount.innerHTML = this.value;
  monthlyRepayment.innerHTML = ((slider.value * 0.05) + Number(slider.value)) / tenor.value
}

const statusCheck = document.querySelector('#status-checkbox').getAttribute('checked');
console.log(statusCheck)
const status = document.querySelector('#status');
statusCheck.oninput = function () {
    status.innerHTML = 'verified';
}


