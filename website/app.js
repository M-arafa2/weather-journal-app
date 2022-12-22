/* Global Variables */
const apiKey = '&units=metric&appid=89fed50841e0ba397c468f3fa49d2055';
const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?zip='

const generateReq = document.getElementById('generate');
generateReq.addEventListener('click', queryApi);
function queryApi(e){
    //zipcode entered by user.
    let zipCode = document.getElementById('zip').value;
    // user entry for the feeling input.
    let userComment = document.getElementById('feelings').value;
    // query open weather api, save it to projectData and retrieve update ui.
    getweatherData(baseUrl, zipCode ,apiKey)
    //TODO:after finishing the get weather start next function
    .then(function(data){
        postData('/addWeather',
                {temp:data.list[0].main.temp,
                date:newDate,
                userResponse:userComment})
                /* using the retrieveData here to make sure it 
                only retrieve after the database has been updated
                 by the post methond */
                retrieveData('/all');
    
    });
    
}
// Function to GET Web API Data*/
const getweatherData = async(baseUrl, zipCode, apiKey)=>{

    const res = await fetch(baseUrl + zipCode + apiKey)
    try {
        const data = await res.json();
        console.log(data);
        return data
    }catch(error){
        console.log('error:', error);
    }
}
// Async POST
// Function to POST data 
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });
  
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
  };

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// Async GET
// Function to GET Project Data 
const retrieveData = async (url='') =>{ 
    const request = await fetch(url);
    try {
    // Transform into JSON
    const allData = await request.json()
    updateUi(allData);
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
    };
function updateUi(allData){
    // x is the last item in the array.
    let x = allData.length-1;
    document.querySelector('#temp').innerHTML = Math.round(allData[x].temp) + ' degrees';
    document.querySelector('#date').innerHTML = allData[x].date;
    document.querySelector('#content').innerHTML = allData[x].userResponse;

}