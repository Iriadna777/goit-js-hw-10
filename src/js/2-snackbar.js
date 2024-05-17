import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.getElementById('promiseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const delay = parseInt(document.getElementById('delayInput').value);
    const state = document.querySelector('input[name="state"]:checked').value;
  
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(`Fulfilled promise in ${delay}ms`);
        } else {
          reject(`Rejected promise in ${delay}ms`);
        }
      }, delay);
    })
    .then(message => {
      iziToast.success({
        title: 'OK',
        message: message
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: error
      });
    });
  });
  
