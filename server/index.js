const express = require('express')
const bodyParser = require('body-parser')
const database = require('../database/index.js')

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));




database.getData().then((dataObj)=>{
	console.log(dataObj, 'db to router')
})
// connection.getData('hello');

//  localhost:4000/item/205

// app.get('/item/:id', function(req){  //: means id is a variable  //once react loads, check the url
//res.sendFile('index.html')
// 		req.params.id === '205'
// })
//app.get('/availableDates')
//app.post('/reservarion/:id', ()=>{
//		req.params.id
//		req.query.adults
//})

app.listen(4000, ()=>{
    console.log("listening on port 4000")
})