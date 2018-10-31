const express = require('express')
const bodyParser = require('body-parser')
const database = require('../database/index.js')
const path = require('path')
var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/../client/dist')));

app.get('/listing/id:id', (req, res)=>{ 
	id = req.params.id
	console.log('getting request', id)
	database.getData(id).then((dataObj)=>{
		res.status(200).send(dataObj);
	})
	
})


app.get('/*', (req, res)=>{
	res.sendFile(path.join(__dirname + '/../client/dist/index.html'))
})


app.listen(4000, ()=>{
    console.log("listening on port 4000")
})

app.listen(process.env.PORT)
