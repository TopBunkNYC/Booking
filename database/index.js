var mysql = require('promise-mysql');


let aptData = {dates: [], price: 0, apartmentid: 0};

let stringParse = (data)=>{
    return JSON.parse(JSON.stringify(data))
};

var getData = ()=>{

    let aptData = {dates: [], price: 0, apartmentid: 0};

    return mysql.createConnection({

        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'booking'

    }).then((conn)=>{

        let aptDates = conn.query(`
        SELECT 
        date, 
        price,
        apartmentid
        FROM
        apartment t1
            INNER JOIN
        dates t2 ON t1.id = t2.apartment_id;
        `);
    
        conn.end();
        return (aptDates);

    }).then((raw)=>{

        let data = stringParse(raw)
        aptData.price = data[0].price;
        aptData.apartmentid = data[0].apartmentid;

        data.forEach(({date}) => {
            aptData.dates.push(date)
        });

    }).then(()=>{
        return aptData;
    })
    
}

module.exports.getData = getData;
