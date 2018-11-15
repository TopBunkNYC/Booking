module.exports = (async () => {
  var mongoose = require("mongoose");
  const AutoIncrement = require("mongoose-sequence")(mongoose);
  await mongoose.connect(
    "mongodb://localhost/topBunk",
    { useNewUrlParser: true }
  );

  var db = mongoose.connection;

  var listingSchema = new mongoose.Schema(
    {
      _id: { type: Number, unique: true },
      price: Number,
      maxGuests: Number,
      minStay: Number,
      stars: mongoose.Decimal128,
      numRatings: Number,
      bookedDates: [String]
    },
    { _id: false }
  );
  listingSchema.plugin(AutoIncrement, { id: "listings" });

  var Listing = mongoose.model("Listing", listingSchema);

  // console.log(db);
  return {
    Listing,
    db
  };
})();
