let db = require('./mongo.js');
let mongoose = require('mongoose');
const randomNumberUpTo = (limit) => Math.floor(Math.random() * limit);

var listingSchema = new mongoose.Schema({
  id: Number,
  price: Number,
  maxGuests: Number,
  minStay: Number,
  stars: mongoose.Decimal128,
  numRatings: Number,
  bookedDates: [String]
})

var Listing = mongoose.model('Listing', listingSchema);

const seedListings = async () => {
  let t1 = Date.now();
  for (let batch = 0; batch < 100000; batch++) {
    let listingBatch = [];
    for (let listing = 0; listing < 100; listing++) {
      let id = (batch * 100) + (listing + 1);
      let price = 50 + randomNumberUpTo(400);
      let maxGuests = 1 + randomNumberUpTo(6);
      let minStay = 1 + randomNumberUpTo(2);
      let stars = (1 + (Math.random() * 4)).toFixed(2);
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
      listingBatch.push(newListing);
    }
    await Listing.insertMany(listingBatch)
    console.log(`${100*batch + 100} listings inserted`);
  }
  let timeElapsed = Date.now() - t1;
  console.log(`timeElapsed: ${timeElapsed}`);
}

seedListings();

async function generateBookedDates(minStay) {
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
    let numDays = minStay + randomNumberUpTo(3);
    let startingDay = curDay;
    for (let dayOfStay = curDay; dayOfStay < (startingDay + numDays); dayOfStay++) {
      let bookedDate = days[dayOfStay];
      bookedDates.push(bookedDate);
      curDay++;
    }
    curDay += randomNumberUpTo(10);
  }
  return bookedDates;
}



// create listings
// const seedListings = async () => {
//   for (let i = 0; i < 1000; i++) {
//     let listingsBatch = [];
//     for (let j = 0; j < 10000; j++) {
//       let price = 50 + randomNumberUpTo(400);
//       let maxguests = 1 + randomNumberUpTo(6);
//       let minStay = 1 + randomNumberUpTo(2);
//       let stars = (1 + (Math.random() * 4)).toFixed(2);
//       let numratings = randomNumberUpTo(110);
//       let listing = {
//         price,
//         maxguests,
//         minStay,
//         stars,
//         numratings
//       }
//       listingsBatch.push(listing)
//     }
//     await knex.batchInsert('bookings.listings', listingsBatch, 10000);
//     console.log(`${i * 10000 + 10000} listings inserted`);
//   }
// }