import flatpickr from 'flatpickr/dist/flatpickr.min.js';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    const startButton = document.getElementById('start-button');
    if (selectedDate < currentDate) {
      window.alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};

const flatpickrInstance = flatpickr('#datetime-picker', options);
const startButton = document.getElementById('start-button');
let interval;
startButton.addEventListener('click', () => {
  const selectedDate = flatpickrInstance.selectedDates[0];
  const currentTime = new Date().getTime();
  const selectedTime = selectedDate.getTime();
  if (selectedTime > currentTime) {
    const countdown = selectedTime - currentTime;
    interval = setInterval(() => {
      const remainingTime = countdown - new Date().getTime();
      const { days, hours, minutes, seconds } = convertMs(remainingTime);
      document.querySelector('[data-days]').textContent = addLeadingZero(days);
      document.querySelector('[data-hours]').textContent =
        addLeadingZero(hours);
      document.querySelector('[data-minutes]').textContent =
        addLeadingZero(minutes);
      document.querySelector('[data-seconds]').textContent =
        addLeadingZero(seconds);

      if (remainingTime < 0) {
        clearInterval(interval);
        document.getElementById('start-button').disabled = true;
      }
    }, 1000);
  }
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
