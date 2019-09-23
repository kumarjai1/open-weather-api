console.log('main.js is connected!');

/*

Here's an overview of the steps you'll follow to get your app to work...

STEPS

1. when the page loads
  - add an event listener to the button
2. When the button is clicked
  - grab the input
  - store the value
  - make an API request based on the input value
3. When the API response is returned
  - grab all the appropriate DOM elements
  - append the data to the DOM

*/
window.addEventListener('DOMContentLoaded', function() {
  document.getElementById('search').addEventListener('click', function() {
    let zipCode = parseInt(document.getElementById('zipcode').value);
    let cityName = document.getElementById('city');
    let temp = document.getElementById('temp');

    console.log(zipCode);

    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=d3dbf4e31a161d7db1e84b9813cd2109`)
      .then((response) => {
        return response.json();
      })
      .then ((response) => {
        console.log(response)
        cityName.innerText = response.name;
        temp.innerText = parseInt(convertTemp(response.main.temp));
        document.getElementById('desc').innerText = response.weather[0].description;
        document.getElementById('minTemp').innerText = parseInt(convertTemp(response.main.temp_min));
        document.getElementById('maxTemp').innerText = parseInt(convertTemp(response.main.temp_max));
        tempColor (temp.innerText);
      })
      .catch ((err) => {
        console.log(err);
      })
      .finally (() => {
        console.log('done');
      })
  })

  function convertTemp (tempe) {
    return ((tempe*1.8) - 459.67);
  }
  function tempColor (tempe) {
    if (tempe < 40 ) {
      temp.style.color = 'blue';
    } else if (tempe > 90) {
      temp.style.color = 'red';
    }
  }
  //console.log(convertTemp(300));
})