/* Global Variables */
const apiKey = '6c3f358c7114aa86a8c8384e4eeb9d5f&units=imperial';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){  
    WeatherData(baseURL, apiKey);
}

function WeatherData(baseURL, apiKey) {
    const zipInput = document.querySelector('#zip');
    const feelInput = document.querySelector('#feelings');
    const zipCode = zipInput.value;
    const feelValue = feelInput.value;

    console.log(feelValue);

    // GET the temperature from the Web API Data
    fetch(`${baseURL}zip=${zipCode}&appid=${apiKey}`)
    .then(response => {

        // If the zip code invalid
        if (!response.ok) {
            return null;
        }

        // return the response
        return response.json();
    })

    // Fetch the response to post the data to server
    .then(data => {
        // Get the temp from the API
        let temp;
        if(data == null){
            temp = "the zip code is invalid";
        }
        else{
            temp = data.main.temp;
        }

        return fetch("/postData", {
            method: 'POST', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json',
            },

            // send the data into the post body
            body: JSON.stringify({
                date : newDate,
                temp : temp,
                content : feelValue
            }),       
        });
    })

    // GET the data from server.js
    .then(function(data){
        retrieveData();
    });
}

/* Update UI */
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById("date").innerHTML =allData.date;
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
        document.getElementById('content').innerHTML = allData.content;
        }
        catch(error) {
          console.log("error", error);
          // appropriately handle the error
        }
}