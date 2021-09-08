// console.log('Client side js file loaded')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    msg1.textContent = 'Fetching data...'
    msg2.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent=data.error
            } else {
                msg1.textContent=data.location
                msg2.textContent=data.forecast.descr+', '+data.forecast.temp+'C'
            }
        })
    })
})

