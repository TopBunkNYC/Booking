const express = require('express')
const bodyParser = require('body-parser')
const database = require('../database/index.js')
const path = require('path')
var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/../client/dist')));

//listing?id=9873001   
app.get('/listing/id:id', (req, res)=>{ 
	id = req.params.id
	console.log('getting request', id)
	database.getData(id).then((dataObj)=>{
		res.status(200).send(dataObj);
		//console.log(dataObj, 'db to router') dataObj is { dates: [ '2018/12/01'...], price: 100, apartmentid: 9873001 }
	})
	
})


app.get('/*', (req, res)=>{
	res.sendFile(path.join(__dirname + '/../client/dist/index.html'))
})


database.getData().then((dataObj)=>{
	//console.log(dataObj, 'db to router') dataObj is { dates: [ '2018/12/01'...], price: 100, apartmentid: 9873001 }
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


// app.get('/*', (req, res)=>{
// 	res.sendFile(path.join(__dirname + '/../client/dist'))
// })

app.listen(4000, ()=>{
    console.log("listening on port 4000")
})

app.listen(process.env.PORT)
