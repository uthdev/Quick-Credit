// const slider = document.querySelector('.amount');
// const selected = document.querySelector('.form__span');
// selected.innerHTML += slider.value;

// slider.oninput = () => {
//   selected.innerHTML = this.value;
// };
var slider = document.getElementById("amount");
var output = document.getElementById("selected");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}