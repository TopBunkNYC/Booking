let knex = require('./../database/index.js');
let { db, Listing } = require('./../database/mongo.js');
let generateBookedDates = require('./../database/generateBookedDates')

const randomNumberUpTo = (limit) => Math.floor(Math.random() * limit);

jest.setTimeout(60000);

let testIterations = 1000;

describe('PostgresQL Query Speeds', () => {
  
  test('fetching listing and bookeddates takes <= 50ms', async () => {

    let totalFetchListingTimeElapsed = 0;
    let totalFetchBookedDatesTimeElapsed = 0;

    for (let i = 0; i < testIterations; i++) {
      let id = randomNumberUpTo(10000000);

      let t1 = Date.now();
      let listing = await knex.select().from('bookings.listings').where('id', id).limit(1);
      totalFetchListingTimeElapsed += Date.now() - t1;

      let t2 = Date.now();
      let bookeddates = await knex.select().from('bookings.bookeddates').where('listing_id', id);
      totalFetchBookedDatesTimeElapsed += Date.now() - t2;
    }

    let averageListingFetchSpeed = totalFetchListingTimeElapsed / testIterations;
    let averageBookedDatesFetchSpeed = totalFetchBookedDatesTimeElapsed / testIterations;
    let averageTotalFetchSpeed = averageListingFetchSpeed + averageBookedDatesFetchSpeed;
    console.log(`Average Postgres fetch speed: 
    Listing: ${averageListingFetchSpeed}
    BookedDates: ${averageBookedDatesFetchSpeed}
    Total: ${averageTotalFetchSpeed}`);

    expect(averageTotalFetchSpeed).toBeLessThanOrEqual(50);
    
  });
  
  test('writing listing takes <= 50ms', async () => {

    let totalListingTimeElapsed = 0;
    let totalBookedDatesTimeElapsed = 0;

    for (let i = 0; i < testIterations; i++) {
      let price = 50 + randomNumberUpTo(400);
      let maxguests = 1 + randomNumberUpTo(6);
      let minstay = 1 + randomNumberUpTo(2);
      let stars = (1 + (Math.random() * 4)).toFixed(2);
      let numratings = randomNumberUpTo(110);
      let listing = {
        price,
        maxguests,
        minstay,
        stars,
        numratings
      }

      let t1 = Date.now();
      let insertId = await knex('bookings.listings').insert(listing).returning('id');
      let timeElapsed1 = Date.now() - t1;
      totalListingTimeElapsed += timeElapsed1;
      
      insertId = insertId[0];
      await knex('bookings.listings').where('id', insertId).del();

      let bookedDatesArr = generateBookedDates(minstay, insertId);
      let t2 = Date.now();
      await knex.batchInsert('bookings.bookeddates', bookedDatesArr, 10000);
      let timeElapsed2 = Date.now() - t2;
      totalBookedDatesTimeElapsed += timeElapsed2;

      await knex('bookings.bookeddates').where('listing_id', insertId).delete();
    }

    let averageListingWriteSpeed = totalListingTimeElapsed / testIterations;
    let averageBookedDatesWriteSpeed = totalBookedDatesTimeElapsed / testIterations;
    let averageTotalWriteSpeed = averageBookedDatesWriteSpeed + averageListingWriteSpeed;
    console.log(`Average Postgres write speed: 
    Listing: ${averageListingWriteSpeed}
    BookedDates: ${averageBookedDatesWriteSpeed}
    Total: ${averageTotalWriteSpeed}`);

    expect(averageTotalWriteSpeed).toBeLessThanOrEqual(50);

  });
})

describe('Mongo Query Speeds', () => {

  test('fetching listing takes <= 50ms', async () => {

    let totalTimeElapsed = 0;

    for (let i = 0; i < testIterations; i++) {
      let _id = randomNumberUpTo(10000000);
      let t1 = Date.now();
      let result = await Listing.findOne({'_id': _id});
      let timeElapsed = Date.now() - t1;
      totalTimeElapsed += timeElapsed;
    }

    let averageFetchSpeed = totalTimeElapsed / testIterations;
    console.log(`Average Mongo listing fetch speed: ${averageFetchSpeed}`)

    expect(averageFetchSpeed).toBeLessThanOrEqual(50);  

  });
  
  test('writing listing takes <= 50ms', async () => {

    let totalTimeElapsed = 0;

    for (let i = 0; i < testIterations; i++) {
      let price = 50 + randomNumberUpTo(400);
      let maxGuests = 1 + randomNumberUpTo(6);
      let minStay = 1 + randomNumberUpTo(2);
      let stars = Number((1 + (Math.random() * 4)).toFixed(2));
      let numRatings = randomNumberUpTo(110);
      let bookedDates = generateBookedDates(minStay);
      let listingProps = {
        price,
        maxGuests,
        minStay,
        stars,
        numRatings,
        bookedDates
      }
      let newListing = new Listing(listingProps);
      let t1 = Date.now();
      let savedListing = await newListing.save();
      let timeElapsed = Date.now() - t1;
      totalTimeElapsed += timeElapsed;
      await Listing.deleteOne({_id: savedListing._id});
    }

    let averageWriteSpeed = totalTimeElapsed / testIterations;
    console.log(`Average Mongo listing write speed: ${averageWriteSpeed}`)
    
    db.close();
    expect(averageWriteSpeed).toBeLessThanOrEqual(50);

  });
})
