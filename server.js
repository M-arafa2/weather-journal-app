// Setup empty JS object to act as endpoint for all routes
projectData = [];
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const port = 8000;

// Spin up the server
const server = app.listen(port,listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};
// Callback to debug
app.get('/', (req, res) => {
    res.json("welcome to our server")});

// Initialize all route with a callback function
app.get('/all',sendData);
// Callback function to complete GET '/all'
function sendData(req,res){
    res.send(projectData);
}
// Post Route
app.post('/addWeather', updateWeather);
function updateWeather(req,res){
    newEntry ={
        temp : req.body.temp,
        date : req.body.date,
        userResponse : req.body.userResponse
    }
    //adding the new entry to projectData as last item.
    projectData.push(newEntry);

};
