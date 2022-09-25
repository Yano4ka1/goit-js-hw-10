// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_orange.css";

import { Notify } from "notiflix/build/notiflix-notify-aio";


const refs = {
    btnStart: document.querySelector('button[data-start]'),
    dataDays: document.querySelector('span[data-days]'),
    dataHours: document.querySelector('span[data-hours]'),
    dataMinutes: document.querySelector('span[data-minutes]'),
    dataSeconds: document.querySelector('span[data-seconds]'),
};

let dateTime = null;

//  З констекту
const options = {
    enableTime: true, 
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,


    onReady() {
        refs.btnStart.setAttribute('disabled', true);
    },

    onClose(selectedDates) {
        dateTime = selectedDates[0].getTime();

      if (dateTime <= Date.now()) {
        Notify.failure('Please choose a date in the future');
        refs.btnStart.setAttribute('disabled', true);
        this.open();
        return;
      }

      if (refs.btnStart.hasAttribute('disabled')) {
        Notify.success('Everything is OK. You can get started countdown'); 
        refs.btnStart.removeAttribute('disabled');
      }
    },
  };

  refs.btnStart.addEventListener('click', onStartBtnClick)

  flatpickr('#datetime-picker', options);

  function onStartBtnClick() {
    refs.btnStart.setAttribute('disabled', true);
  
    const intervalId = setInterval(() => {
      if ((dateTime - Date.now()) < 0) {
        clearInterval(intervalId);
        return;
        }
  
      const timeToSelectedDate = convertMs(dateTime - Date.now());
      countDown(timeToSelectedDate);
    }, 1000)
  }

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

  function addLeadingZero(value) {
    return String(value).padStart(2, 0);
  }

  function countDown ({days, hours, minutes, seconds}) {
    refs.dataDays.textContent = addLeadingZero(days);
    refs.dataHours.textContent = addLeadingZero(hours);
    refs.dataMinutes.textContent = addLeadingZero(minutes);
    refs.dataSeconds.textContent = addLeadingZero(seconds);
  }
