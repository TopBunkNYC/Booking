let knex = require('./index.js');

const randomNumberUpTo = (limit) => Math.floor(Math.random() * limit);

// create listings and insert in batches of 10,000
const seedListings = async () => {
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
      let bookedDatesArr = await generateBookedDates(minstay, listing_id);
      bookedDatesBatch = bookedDatesBatch.concat(bookedDatesArr); 
    }
    await knex.batchInsert('bookings.listings', listingsBatch, 10000);
    await knex.batchInsert('bookings.bookeddates', bookedDatesBatch, 10000);
    console.log(`${i * batchSize + batchSize} listings inserted`);
  }
  let timeElapsed = Date.now() - t1;
  console.log(`timeElapsed: ${timeElapsed}`);
}

seedListings();

async function generateBookedDates(minStay, listing_id) {

  // create objects to map months to corresponding number of days in month and to year
  let months = [11,12,1,2];
  let daysInMonth = {
    11: 30,
    12: 31,
    1: 31,
    2: 28
  }
  let monthToYear = {
    11: 2018,
    12: 2018,
    1: 2019,
    2: 2019
  }

  // create array of all possible days for booking (all days Nov '18 through Feb '19)
  let days = [];
  for (let month of months) {
    for (let day = 1; day < daysInMonth[month] + 1; day++) {
      dayString = day.toString()
      if (dayString.length === 1) {
        dayString = '0' + dayString;
      }
      monthString = month.toString()
      if (monthString.length === 1) {
        monthString = '0' + monthString;
      }
      days.push(`${monthToYear[month]}-${monthString}-${dayString}`)
    }
  }

  let bookedDates = [];
  let curDay = 0;
  curDay += randomNumberUpTo(10);
  while (curDay < days.length - 1 - minStay) {
    // ensure length of stay conforms to minStay rule for listing
    let numDays = minStay + randomNumberUpTo(3);
    let startingDay = curDay;
    // add stays of random lengths with random gaps in between until end of available booking period
    for (let dayOfStay = curDay; dayOfStay < (startingDay + numDays); dayOfStay++) {
      let bookedDate = {
        date: days[dayOfStay],
        listing_id
      }
      bookedDates.push(bookedDate);
      curDay++;
    }
    curDay += randomNumberUpTo(10);
  }
  return bookedDates;
}
