let Listing = require('./mongo.js');
const randomNumberUpTo = (limit) => Math.floor(Math.random() * limit);

// let id = (batch * 100) + (listing + 1);
let price = 50 + randomNumberUpTo(400);
let maxGuests = 1 + randomNumberUpTo(6);
let minStay = 1 + randomNumberUpTo(2);
let stars = Number((1 + (Math.random() * 4)).toFixed(2));
let numRatings = randomNumberUpTo(110);
let bookedDates = ['2018-01-01'];
let listingProps = {
  price,
  maxGuests,
  minStay,
  stars,
  numRatings,
  bookedDates
};

let newListing = new Listing(listingProps);
newListing.save((err, listing) => {
  console.log(err);
  console.log(listing);
});