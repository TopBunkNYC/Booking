const express = require('express')
const bodyParser = require('body-parser')
const database = require('../database/index.js')
const path = require('path')
const port = 4000;
const morgan = require('morgan');
const cors = require('cors')

var app = express();

app.use("default", morgan)
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname + '/../client/dist')));

app.get('/listing/id:id', (req, res)=>{ 

	id = req.params.id
	console.log('getting request', id, req.url)
	database.getData(id).then((dataObj)=>{
		// console.log('data', dataObj)
		res.status(200).send(dataObj);
	})
	
})

// app.use('/bundle.js', express.static(path.join(__dirname + '/../client/dist')));

app.get('/*', (req, res)=>{
	res.sendFile(path.join(__dirname + '/../client/dist/index.html'))
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

// app.listen(process.env.PORT)
