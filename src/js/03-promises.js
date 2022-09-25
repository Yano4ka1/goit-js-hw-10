// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position,
// delay) стільки разів, скільки ввели в поле amount. 
// Під час кожного виклику передай їй номер промісу (position), що створюється, 
//і затримку, враховуючи першу затримку (delay), введену користувачем, і крок (step).

// Доповни код функції createPromise таким чином, щоб вона повертала один проміс, 
// який виконується або відхиляється через delay часу. Значенням промісу повинен бути об'єкт,
// в якому будуть властивості position і delay зі значеннями однойменних параметрів. 
// Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - 
// виконати або відхилити.

import {Notify} from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form')
}

refs.form.addEventListener('submit', onSubmit);

function onSubmit(evn) {
  evn.preventDefault();

  const {
    elements: {
      delay,
      step,
      amount,
    }
  } = evn.target;

  let promiseDelay = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, promiseDelay).then(onPromiseSuccess).catch(onPromiseError)
    promiseDelay += Number(step.value);
  }

  evn.target.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay)
  })
}

function onPromiseSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`); 
}

function onPromiseError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}