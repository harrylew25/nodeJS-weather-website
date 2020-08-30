console.log('Client side javascript file is loaded.');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); //prevent default behavior: refresh the page

    const location = search.value;
    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data.weather.location;
                messageTwo.textContent = data.weather.forecast;
            }
        });
    });
});