import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form')
const STORAGE_KEY = 'feedback-form-state';

let formData = {};

isInputEmpty();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onStorageSave, 500));

function onStorageSave() {
   formData = {
      email: form.email.value,
      message: form.message.value,
   }
   
   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
   evt.preventDefault();

   if(!form.email.value || !form.message.value) {
      return;
   }
   
   console.log({ email: form.email.value, message: form.message.value });

   evt.currentTarget.reset();
   
   localStorage.removeItem(STORAGE_KEY);
   }

function isInputEmpty() {
   const storagedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
   if (storagedMessage) {
      form.email.value = storagedMessage.email || '';
      form.message.value = storagedMessage.message || '';
   }
}
