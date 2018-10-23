const express = require('express')
const bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));


app.listen(4000, ()=>{
    console.log("listening on port 4000")
})