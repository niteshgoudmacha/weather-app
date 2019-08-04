//  console.log('js file is loaded')
// const func = require('../../src/app')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const getLocation = document.getElementById('getlocation');


messageOne.textContent = ''


 weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    const location = search.value

    fetch('/weather?address=' + location ).then((response) => {
        // console.log(response.json)
     response.json().then((data) => {
         if(data.error){
             messageOne.textContent = data.error
         }
         else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
         }
         search.value = ''
     })
    })
 })

getLocation.addEventListener('click', (evt) => {
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition((position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            // console.log(latitude, longitude);

            fetch('/currentlocation?latitude=' +latitude + '&longitude=' + longitude ).then((response) => {
                //console.log(response)
                response.json().then((data) => {
                    if(data.error){
                        messageOne.textContent = data.error
                    }
                    else {
                       messageOne.textContent = data.location
                       messageTwo.textContent = data.forecast
                    }
                })
            }).catch((error) => {
                console.log(error)
            })
        },(error) => {
            console.log(error.code);
        });
    }
    else {
        console.log("Not Supported");
    }
})

