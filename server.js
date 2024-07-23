// Setup empty JS object to act as endpoint for all routes
let projectData = {};

/* Express to run server and routes */
import express from 'express';

/* Start up an instance of app */
const app = express();

/* Dependencies */
import bodyParser from 'body-parser';

/* Middleware*/
import cors from 'cors';

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening() {
    console.log(`running on localhost: ${port}`);
}

// Initialize all route with a callback function
// GET route
app.get('/all', getAll);

function getAll(req, res) {
    res.send(projectData);
}

// POST route
app.post('/addNew', callback );

function callback (req, res){
    res.send("POST received");
}

// POST a data
app.post('/postData', (req, res)=>{
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;
    res.send("Data Saved Successfully");
});
