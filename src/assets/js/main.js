<<<<<<< HEAD

window.onload = () => {
  const copy = 'script ready2!'
  console.log(copy)
}
=======
const button = document.querySelector('.welcome__btn');
const body = document.querySelector('body');

button.addEventListener('click', () => {
  if(button.innerHTML == 'Stop'){
    body.style.animationName = 'stop';
    button.innerHTML = "Play";
  }else {
    body.style.animationName = 'play';
    button.innerHTML = "Stop";
  }
});
>>>>>>> f3e1b033ac9f3c555d71080b08b57091113d6501
