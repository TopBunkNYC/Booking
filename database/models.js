let { db, Listing } = require('./../database/mongo.js');

const getListing = async (id) => {
	let listing = await Listing.findOne({'_id': id})
	return listing;
};

const postListing = async (listingProps) => {
	console.log(listingProps);
	let newListing = new Listing(listingProps);
	let savedListing = await newListing.save();
	console.log(savedListing);
	return savedListing;
};

const getBookedDatesForListing = (listingId) => {

};

const postBookedDatesForListing = (listingId) => {

};

module.exports = {
	getListing,
	postListing,
	getBookedDatesForListing,
	postBookedDatesForListing
}