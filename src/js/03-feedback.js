import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form')
const STORAGE_KEY = 'feedback-form-state';

let formData = {};

isInputEmpty();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onStorageSave, 500));

function onStorageSave(evt) {
   formData[evt.target.name] = evt.target.value;
   
   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
   evt.preventDefault();
   evt.currentTarget.reset();

   console.log({ email: form.email.value, message: form.message.value });
   
   localStorage.removeItem(STORAGE_KEY);
}

function isInputEmpty() {
   const storagedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
   if (storagedMessage) {
      form.email.value = storagedMessage.email;
      form.message.value = storagedMessage.message;
   }
}
