var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/topBunk');

var db = mongoose.connection;

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

module.exports = Listing;
