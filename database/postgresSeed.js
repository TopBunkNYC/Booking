let knex = require('./index.js');
let generateBookedDates = require('./generateBookedDates');
const randomNumberUpTo = (limit) => Math.floor(Math.random() * limit);

// create listings and insert in batches of 10,000
(async () => {
  let t1 = Date.now();
  for (let i = 0; i < 20000; i++) {
    let listingsBatch = [];
    let bookedDatesBatch = [];
    let batchSize = 500;
    
    for (let j = 0; j < batchSize; j++) {

      // create listing
      let price = 50 + randomNumberUpTo(400);
      let maxguests = 1 + randomNumberUpTo(6);
      let minstay = 1 + randomNumberUpTo(2);
      let stars = (1 + (Math.random() * 4)).toFixed(2);
      let numratings = randomNumberUpTo(110);
      let listing_id = (i * batchSize) + j + 1;
      let listing = {
        id: listing_id,
        price,
        maxguests,
        minstay,
        stars,
        numratings
      }
      listingsBatch.push(listing)

      // create bookedDates 
      let bookedDatesArr = generateBookedDates(minstay, listing_id);
      bookedDatesBatch = bookedDatesBatch.concat(bookedDatesArr); 
    }
    await knex.batchInsert('bookings.listings', listingsBatch, 10000);
    await knex.batchInsert('bookings.bookeddates', bookedDatesBatch, 10000);
    console.log(`${i * batchSize + batchSize} listings inserted`);
  }
  let timeElapsed = Date.now() - t1;
  console.log(`timeElapsed: ${timeElapsed}`);
})();
