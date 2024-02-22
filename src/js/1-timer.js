import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import errorIcon from '../img/error.svg';

const userDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const remainingDays = document.querySelector('span[data-days]');
const remainingHours = document.querySelector('span[data-hours]');
const remainingMinutes = document.querySelector('span[data-minutes]');
const remainingSeconds = document.querySelector('span[data-seconds]');
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(userSelectedDate);
    if (userSelectedDate - Date.now() < 0) {
      iziToast.error({
        iconUrl: errorIcon,
        title: 'Error',
        message: 'Please choose a date in the future',
        titleColor: '#ffffff',
        messageColor: '#ffffff',
        backgroundColor: '#EF4040',
        position: 'topRight',
        titleSize: 16,
        messageSize: 16,
        maxWidth: 902,
        close: false,
      });
      btnStart.setAttribute('disabled', '');
    } else {
      btnStart.removeAttribute('disabled');
      userDate.setAttribute('disabled', '');
    }
  },
};

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

btnStart.setAttribute('disabled', '');

const selectedDates = flatpickr('#datetime-picker', options);
console.log(selectedDates);

function timer() {
  const delta = userSelectedDate - Date.now();
  if (delta <= 0) {
    clearInterval(interval);
    userDate.removeAttribute('disabled');
    // btnStart.setAttribute('disabled', '');

    return;
  }
  const { days, hours, minutes, seconds } = convertMs(delta);
  remainingDays.textContent = String(days).padStart(2, '0');
  remainingHours.textContent = String(hours).padStart(2, '0');
  remainingMinutes.textContent = String(minutes).padStart(2, '0');
  remainingSeconds.textContent = String(seconds).padStart(2, '0');
}
let interval;
function startTimer() {
  btnStart.setAttribute('disabled', '');
  interval = setInterval(timer, 1000);
}
btnStart.addEventListener('click', startTimer);
