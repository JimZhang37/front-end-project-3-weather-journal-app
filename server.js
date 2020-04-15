// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));

app.get('/getdata', (req,res)=>{
    const size = projectData.length
    if(size>0){
        res.send(projectData[size-1]);
    }
    
    console.log(projectData[size-1])
})

app.post('/postdata', (req, res)=>{
    newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        user_response: req.body.user_response
    }
    projectData.push(newEntry)
    
    res.send(newEntry)
    // console.log(newEntry)

})
// Setup Server
const port = 8080
const server = app.listen(port,()=>{console.log(`the localhost is running on port: ${port}`)})