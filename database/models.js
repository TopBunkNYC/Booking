let { db, Listing } = require('./../database/mongo.js');

const getListing = async (id) => {
	return await Listing.findOne({'_id': id})
};

const postListing = async (listingProps) => {
	let newListing = new Listing(listingProps);
	return await newListing.save();
};

const updateListing = async (id, listingProps) => {
	return await Listing.findByIdAndUpdate(id, listingProps);
}

const deleteListing = async (id) => {
  return await Listing.findByIdAndDelete(id);
};

const getBookedDatesForListing = (listingId) => {

};

const postBookedDatesForListing = (listingId) => {

};

module.exports = {
	getListing,
	postListing,
	updateListing,
	deleteListing,
	getBookedDatesForListing,
	postBookedDatesForListing
}