let knex = require('./../database/index.js');
let MongoListing = require('./../database/mongo.js');

const randomNumberUpTo = (limit) => Math.floor(Math.random() * limit);

let id = randomNumberUpTo(10000000);

// describe('PostgresQL Query Speeds', () => {
//   test('fetching listing takes <= 50ms', async () => {
//     let t1 = Date.now();
//     await knex.select().from('bookings.listings').where('id', id);
//     let timeElapsed = Date.now() - t1;
//     expect(timeElapsed).toBeLessThanOrEqual(50);
//     console.log(`PostGres listing fetch speed: ${timeElapsed}`)
//   });
  
//   test('writing listing takes <= 50ms', async () => {
//     let price = 50 + randomNumberUpTo(400);
//     let maxguests = 1 + randomNumberUpTo(6);
//     let minstay = 1 + randomNumberUpTo(2);
//     let stars = (1 + (Math.random() * 4)).toFixed(2);
//     let numratings = randomNumberUpTo(110);
//     let listing = {
//       price,
//       maxguests,
//       minstay,
//       stars,
//       numratings
//     }
//     let t1 = Date.now();
//     let insertId = await knex('bookings.listings').insert(listing).returning('id');
//     let timeElapsed = Date.now() - t1;
//     expect(timeElapsed).toBeLessThanOrEqual(50);
//     console.log(`PostGres listing write speed: ${timeElapsed}`)
//     insertId = insertId[0];
//     await knex('bookings.listings').where('id', insertId).del();
//   });
// })

describe('Mongo Query Speeds', () => {
  test('fetching listing takes <= 50ms', async () => {
    let t1 = Date.now();
    await MongoListing.find({'id': id});
    let timeElapsed = Date.now() - t1;
    expect(timeElapsed).toBeLessThanOrEqual(50);
    console.log(`PostGres listing fetch speed: ${timeElapsed}`)
  });
  
  test('writing listing takes <= 50ms', async () => {
    let id = (batch * 100) + (listing + 1);
    let price = 50 + randomNumberUpTo(400);
    let maxGuests = 1 + randomNumberUpTo(6);
    let minStay = 1 + randomNumberUpTo(2);
    let stars = Number((1 + (Math.random() * 4)).toFixed(2));
    let numRatings = randomNumberUpTo(110);
    let bookedDates = await generateBookedDates(minStay);
    let listingProps = {
      id,
      price,
      maxGuests,
      minStay,
      stars,
      numRatings,
      bookedDates
    }
    let newListing = new Listing(listingProps);
    let t1 = Date.now();

    // let insertId = await knex('bookings.listings').insert(listing).returning('id');
    // let timeElapsed = Date.now() - t1;
    // expect(timeElapsed).toBeLessThanOrEqual(50);
    // console.log(`PostGres listing write speed: ${timeElapsed}`)
    // insertId = insertId[0];
    // await knex('bookings.listings').where('id', insertId).del();
  });
})
