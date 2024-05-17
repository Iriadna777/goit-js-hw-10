import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
let countdownTimer = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
            });
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
        }
    },
};

flatpickr(datetimePicker, options);

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    datetimePicker.disabled = true;

    countdownTimer = setInterval(() => {
        const currentTime = new Date();
        const selectedTime = new Date(datetimePicker.value);
        const timeDifference = selectedTime - currentTime;

        if (timeDifference <= 0) {
            clearInterval(countdownTimer);
            iziToast.success({
                title: 'Done',
                message: 'Countdown finished!',
            });
            datetimePicker.disabled = false;
            return;
        }

        updateTimerDisplay(timeDifference);
    }, 1000);
});

function updateTimerDisplay(time) {
    const { days, hours, minutes, seconds } = convertMs(time);
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
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

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}