let knex = require("./../database/index.js");

const getListing = async id => {
  let result = await Promise.all([
    knex.raw(`SELECT * FROM bookings.listings WHERE id = ? LIMIT 1`, [id]),
    knex.raw(`SELECT * FROM bookings.bookeddates WHERE listing_id = ?`, [id])
  ]);
  listing = result[0].rows[0];
  listing.dates = result[1].rows.map(row => row.date);
  listing.stars = Number(listing.stars);
  return listing;
};

const postListing = async listingProps => {
  try {
    let insertId = await knex("bookings.listings")
      .insert(listingProps)
      .returning("id");
    return insertId;
  } catch (err) {
    console.log(err);
  }
};

const updateListing = async (id, listingProps) => {
  try {
    let result = await knex("bookings.listings")
      .where("id", id)
      .update(listingProps);
    return String(result);
  } catch (err) {
    console.log(err);
  }
};

const deleteListing = async id => {
  try {
    return String(
      await knex("bookings.listings")
        .where("id", id)
        .del()
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getListing,
  postListing,
  updateListing,
  deleteListing
};
