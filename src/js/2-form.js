const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';


let formData = {
  email: '',
  message: ''
};

populateForm();


form.addEventListener('input', onInput);


form.addEventListener('submit', onSubmit);


function onInput(event) {
  const { name, value } = event.target;

  formData[name] = value.trimStart(); // Обрізаємо пробіли лише з початку

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}


function onSubmit(event) {
  event.preventDefault();

  const { email, message } = formData;

  if (!email.trim() || !message.trim()) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

 
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = { email: '', message: '' };
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      formData = {
        ...formData,
        ...parsedData
      };

      if (parsedData.email) form.elements.email.value = parsedData.email;
      if (parsedData.message) form.elements.message.value = parsedData.message;
    } catch (error) {
      console.error('Error parsing saved form data', error);
    }
  }
}
