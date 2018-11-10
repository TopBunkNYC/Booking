let knex = require('./index.js');

const randomNumberUpTo = (limit) => Math.floor(Math.random() * limit);

// create listings and insert in batches of 10,000
const seedListings = async () => {
  for (let i = 0; i < 1000; i++) {
    let listingsBatch = [];
    for (let j = 0; j < 10000; j++) {
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
      listingsBatch.push(listing)
    }
    await knex.batchInsert('bookings.listings', listingsBatch, 10000);
    console.log(`${i * 10000 + 10000} listings inserted`);
  }
}

seedListings();

// create bookedDates and insert in batches of 10,000
const seedBookedDates = async () => {
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

  // for each batch of 10,000
  for (let i = 0; i < 1000; i++) {
    let bookedDatesBatch = [];
    // for each listing
    for (let j = 0; j < 10000; j++) {
      // get minimum nights' stay for each listing, to ensure random bookedDates conform to rule
      let minStay = await knex.select('minstay').from('bookings.listings').where('id', (j + 1) + i * 10000).limit(1);
      minstay = minStay[0]['minstay'];

      // add stays of random lengths with random gaps in between until end of available booking period
      let curDay = 0;
      curDay += randomNumberUpTo(10);
      while (curDay < days.length - 1 - minstay) {
        let numDays = minstay + randomNumberUpTo(3);
        let startingDay = curDay;
        for (let dayOfStay = curDay; dayOfStay < (startingDay + numDays); dayOfStay++) {
          let bookedDate = {
            date: days[dayOfStay],
            listing_id: (j + 1) + i * 10000
          }
          bookedDatesBatch.push(bookedDate);
          curDay++;
        }
        curDay += randomNumberUpTo(10);
      }
    }

    await knex.batchInsert('bookings.bookeddates', bookedDatesBatch, 10000);
    console.log(`bookedDates for ${i * 10000 + 10000} listings inserted`);
  }
}

seedBookedDates();
