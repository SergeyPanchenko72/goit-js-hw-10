import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const parametrsPromice = document.querySelector('.form');
parametrsPromice.addEventListener('submit', onSubmitBotton);

function onSubmitBotton(event) {
  event.preventDefault();
  const setled = parametrsPromice.elements.state.value;
  const delay = parametrsPromice.elements.delay.value;

  function makePromice(value, timeout) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value === 'fulfilled') {
          resolve(value);
        } else {
          reject(value);
        }
      }, timeout);
    });
  }

  makePromice(setled, delay)
    .then(value => {
      iziToast.success({
        icon: '',
        title: '',
        message: `✅ Fulfilled promise in ${delay}ms`,
        backgroundColor: '#59A10D',
        messageSize: 16,
        messageColor: '#ffffff',
        close: false,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        icon: '',
        title: '',
        message: `❌ Rejected promise in ${delay}ms`,
        backgroundColor: '#ef4040',
        messageSize: 16,
        messageColor: '#ffffff',
        close: false,
        position: 'topRight',
      });
    })
    .finally(() => parametrsPromice.reset());
}
