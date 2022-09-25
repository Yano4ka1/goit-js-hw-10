// HTML містить кнопки «Start» і «Stop».
// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

// Напиши скрипт, який після натискання кнопки «Start», 
// раз на секунду змінює колір фону <body> на випадкове значення, 
// використовуючи інлайн стиль. Натисканням на кнопку «Stop» 
// зміна кольору фону повинна зупинятися.

// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. 
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.
// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;


const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
};

let intervalid = null;

refs.btnStart.addEventListener('click', onStartClick);
refs.btnStop.addEventListener('click', onStopClick);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function onStartClick() {
    refs.btnStart.setAttribute('disabled', true);
    refs.btnStop.removeAttribute('disabled');

    intervalid = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000);

  }

  function onStopClick() {
    refs.btnStop.setAttribute('disabled', true);
    refs.btnStart.removeAttribute('disabled');

    clearInterval(intervalid);
  }

 