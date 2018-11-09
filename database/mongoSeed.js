let db = require('./mongo.js');
let mongoose = require('mongoose');
const randomNumberUpTo = (limit) => Math.floor(Math.random() * limit);

var listingSchema = new mongoose.Schema({
  price: Number,
  maxguests: Number,
  minstay: Number,
  stars: mongoose.Decimal128,
  numRatings: Number,
  bookedDates: [String]
})

var Listing = mongoose.model('Listing', listingSchema);

let price = 50 + randomNumberUpTo(400);
let maxguests = 1 + randomNumberUpTo(6);
let minstay = 1 + randomNumberUpTo(2);
let stars = (1 + (Math.random() * 4)).toFixed(2);
let numratings = randomNumberUpTo(110);
let bookedDates = ['2018-01-01', '2018-01-02'];
let listingProps = {
  price,
  maxguests,
  minstay,
  stars,
  numratings,
  bookedDates
}
let listing = new Listing(listingProps);
listing.save((err, newListing) => {
  if (err) console.log(err);
  console.log(newListing);
})


// create listings
// const seedListings = async () => {
//   for (let i = 0; i < 1000; i++) {
//     let listingsBatch = [];
//     for (let j = 0; j < 10000; j++) {
//       let price = 50 + randomNumberUpTo(400);
//       let maxguests = 1 + randomNumberUpTo(6);
//       let minstay = 1 + randomNumberUpTo(2);
//       let stars = (1 + (Math.random() * 4)).toFixed(2);
//       let numratings = randomNumberUpTo(110);
//       let listing = {
//         price,
//         maxguests,
//         minstay,
//         stars,
//         numratings
//       }
//       listingsBatch.push(listing)
//     }
//     await knex.batchInsert('bookings.listings', listingsBatch, 10000);
//     console.log(`${i * 10000 + 10000} listings inserted`);
//   }
// }