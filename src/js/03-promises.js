function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('form');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const amount = Number(form.amount.value);
  let currentDelay = Number(form.delay.value);
  const step = Number(form.step.value);

  try {
    for (let i = 0; i < amount; i++) {
      const result = await createPromise(i + 1, currentDelay);
      Notiflix.Notify.Success(
        `✅ Fulfilled promise ${result.position} in ${result.delay}ms`
      );
      currentDelay += step;
    }
  } catch (error) {
    Notiflix.Notify.Failure(
      `❌ Error in promise ${error.position} with delay ${error.delay}ms`
    );
  }
});
