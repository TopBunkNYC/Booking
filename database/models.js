let knex = require("./../database/index.js");

const getListing = async id => {
  let listing = await knex.raw(
    `SELECT * FROM bookings.listings WHERE id = ? LIMIT 1`,
    [id]
  );
  listing = listing.rows[0]
  // listing = listing[0]
  // listing['bookedDates'] =
  return ;
};

const postListing = async listingProps => {
  let newListing = new Listing(listingProps);
  return await newListing.save();
};

const updateListing = async (id, listingProps) => {
  return await Listing.findByIdAndUpdate(id, listingProps);
};

const deleteListing = async id => {
  return await Listing.findByIdAndDelete(id);
};

module.exports = {
  getListing,
  postListing,
  updateListing,
  deleteListing
};
