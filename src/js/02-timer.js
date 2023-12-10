import flatpickr from 'flatpickr/dist/flatpickr.min.js';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const inputElement = document.querySelector('#datetime-picker');

let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      window.alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};

const flatpickrInstance = flatpickr(inputElement, options);

let interval;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  inputElement.disabled = true;

  const currentTime = new Date().getTime();

  if (selectedDate > currentTime) {
    interval = setInterval(() => {
      const remainingTime = selectedDate - new Date().getTime();
      const { days, hours, minutes, seconds } = convertMs(remainingTime);

      daysElement.textContent = addLeadingZero(days);
      hoursElement.textContent = addLeadingZero(hours);
      minutesElement.textContent = addLeadingZero(minutes);
      secondsElement.textContent = addLeadingZero(seconds);

      if (remainingTime <= 1000) {
        clearInterval(interval);
        startButton.disabled = true;
        inputElement.disabled = true;
      }
    }, 1000);
  }
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(remainingTime) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(remainingTime / day);
  const hours = Math.floor((remainingTime % day) / hour);
  const minutes = Math.floor(((remainingTime % day) % hour) / minute);
  const seconds = Math.floor(((remainingTime % day) % hour) / second);

  return { days, hours, minutes, seconds };
}
