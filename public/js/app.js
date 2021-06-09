console.log('Client Side Js');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');
console.log(weatherForm);
weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = '';
    fetch('/weather?address=' + encodeURIComponent(search.value))
    .then((res)=> {
        res.json().then((data)=> {
            if (data.err) {
                messageOne.textContent = data.err
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    });
    console.log('Submitted');
})