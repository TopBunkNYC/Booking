let { Listing } = require('./mongo.js');
let generateBookedDates = require('./generateBookedDates');
const randomNumberUpTo = (limit) => Math.floor(Math.random() * limit);

// create listings and insert in batches of 100
(async () => {
  let t1 = Date.now();
  for (let batch = 0; batch < 100000; batch++) {
    let listingBatch = [];
    for (let listing = 0; listing < 100; listing++) {
      let _id = (batch * 100) + (listing + 1);
      let price = 50 + randomNumberUpTo(400);
      let maxGuests = 1 + randomNumberUpTo(6);
      let minStay = 1 + randomNumberUpTo(2);
      let stars = Number((1 + (Math.random() * 4)).toFixed(2));
      let numRatings = randomNumberUpTo(110);
      let bookedDates = generateBookedDates(minStay);
      let listingProps = {
        _id,
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
    await Listing.insertMany(listingBatch);
    console.log(`${100*batch + 100} listings inserted`);
  }
  let timeElapsed = Date.now() - t1;
  console.log(`timeElapsed: ${timeElapsed}`);
})();
