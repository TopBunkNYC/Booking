var mysql = require('promise-mysql');

let stringParse = (data)=>{
  return JSON.parse(JSON.stringify(data))
};

var getListing = (id)=>{
	console.log('Database query', id)

	let aptData = {dates: [], price: 0, apartmentid: 0, minStay: 0, stars: 0, numRatings: 0, max:0};

	return mysql.createConnection({

		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'booking'
		// host: 'booking.cksae9ebsoyz.us-east-2.rds.amazonaws.com',
		// user: 'root',
		// password: 'louisotter',
		// database : 'booking'


	}).then((conn)=>{
			
		let aptDates = conn.query(`
		SELECT date, price, apartmentid, minStay, stars, numRatings, max
		FROM apartment t1
		INNER JOIN dates t2 
		ON t1.id = t2.apartment_id
		WHERE t1.apartmentid=${id};
		`);

		conn.end();
		return (aptDates);

	}).then((raw)=>{
		let data = stringParse(raw)
		aptData.price = data[0].price;
		aptData.apartmentid = data[0].apartmentid;
		aptData.max = data[0].max;
		aptData.minStay = data[0].minStay;
		aptData.stars = data[0].stars;
		aptData.numRatings = data[0].numRatings;

		data.forEach(({date}) => {
			aptData.dates.push(date)
		});

	}).then(()=>{
		return aptData;
	}).catch((err)=>{
		console.log('query initialized err, works once componentsdidmount');		
	})   
}

var createListing = (data)=>{
  console.log(data);
	// let aptData = {price: 100, apartmentid: 9873888, minStay: 99, stars: 4, numRatings: 99, max:3};
	return mysql.createConnection({

		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'booking'

	}).then((conn)=>{
		let result = conn.query(`INSERT INTO apartment SET ?`, data);
		conn.end();
		return result;
	}).catch((err)=>{
		console.log(err);		
	})   
}

var updateListing = (id, data) => {
	console.log(data);
	let aptid = 9873987
  let aptData = {price: 222, minStay: 22, stars: 22, numRatings: 22, max:2};
	return mysql.createConnection({

		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'booking'

	}).then((conn)=>{
		let result = conn.query(`UPDATE apartment SET ? WHERE apartmentid = ?`, [aptData, aptid]);
		conn.end();
		return result;
	}).catch((err)=>{
		console.log(err);		
	})  
}

module.exports = {
	getListing,
	createListing,
	updateListing
}



