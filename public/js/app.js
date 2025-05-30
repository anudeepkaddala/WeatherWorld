console.log('This is a simple  Javascript client-side script.');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');


messageOne.textContent = '';



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log('Searching for weather in:', location);
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    fetch(`https://weatherworld-unui.onrender.com/weather?address=${encodeURIComponent(location)}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = 'Error: ' + data.error;
                console.error('Error:', data.error);
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                messageThree.textContent = `Address: ${data.address}`;
                console.log('Weather data:', data);
            }
        });
    });
})
