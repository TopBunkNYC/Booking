let knex = require("./../database/index.js");

let generateBookedDates = require("./../database/generateBookedDates");

const randomNumberUpTo = limit => Math.ceil(Math.random() * limit);

jest.setTimeout(60000);

let testIterations = 1000;

let idMax = 100000;

// describe("Fetch Query Speeds", () => {
// test("Sequential Postgres KNEX and Mongo Mongoose fetching takes <= 50ms", async () => {
//   let { db, Listing } = await require("./../database/mongo.js");
//   let totalFetchListingTimeElapsed = 0;
//   let totalFetchBookedDatesTimeElapsed = 0;
//   let totalMongoFetchTimeElapsed = 0;

//   for (let i = 0; i < testIterations; i++) {
//     let id = randomNumberUpTo(idMax);

//     // POSTGRES KNEX LISTING FETCH
//     let t1 = Date.now();
//     let listing1 = await knex
//       .select()
//       .from("bookings.listings")
//       .where("id", id)
//       .limit(1);
//     totalFetchListingTimeElapsed += Date.now() - t1;

//     // POSTGRES KNEX BOOKEDDATES FETCH
//     let t3 = Date.now();
//     let bookeddates = await knex
//       .select()
//       .from("bookings.bookeddates")
//       .where("listing_id", id);
//     totalFetchBookedDatesTimeElapsed += Date.now() - t3;

//     // MONGO LISTING FETCH
//     let t10 = Date.now();
//     let result2 = await Listing.findOne({ _id: id });
//     totalMongoFetchTimeElapsed += Date.now() - t10;
//   }

//   let averageListingFetchSpeed =
//     totalFetchListingTimeElapsed / testIterations;
//   let averageBookedDatesFetchSpeed =
//     totalFetchBookedDatesTimeElapsed / testIterations;
//   let averageTotalFetchSpeed =
//     averageListingFetchSpeed + averageBookedDatesFetchSpeed;
//   console.log(`Average Postgres KNEX fetch speed:
//     Listing: ${averageListingFetchSpeed}
//     BookedDates: ${averageBookedDatesFetchSpeed}
//     Total: ${averageTotalFetchSpeed}`);

//   let averageMongoFetchSpeed = totalMongoFetchTimeElapsed / testIterations;
//   console.log(
//     `Average Mongo Mongoose fetch speed: ${averageMongoFetchSpeed}`
//   );

//   expect(averageListingFetchSpeed).toBeLessThanOrEqual(50);
// });

// test("Sequential Postgres and Mongo raw fetching takes <= 50ms", async () => {
//   let { db } = await require("./../database/mongo.js");

//   let totalRawFetchListingTimeElapsed = 0;
//   let totalRawFetchBookedDatesTimeElapsed = 0;

//   let totalRawMongoFetchListingTimeElapsed = 0;

//   for (let i = 0; i < testIterations; i++) {
//     let id = randomNumberUpTo(idMax);

//     // POSTGRES RAW LISTING FETCH
//     let t2 = Date.now();
//     let listing2 = await knex.raw(
//       `SELECT * FROM bookings.listings WHERE id = ? LIMIT 1`,
//       [id]
//     );
//     totalRawFetchListingTimeElapsed += Date.now() - t2;

//     // POSTGRES RAW BOOKEDDATES FETCH
//     let t4 = Date.now();
//     let bookeddates2 = await knex.raw(
//       `SELECT * FROM bookings.bookeddates WHERE listing_id = ?`,
//       [id]
//     );
//     totalRawFetchBookedDatesTimeElapsed += Date.now() - t4;

//     // MONGO RAW LISTING FETCH
//     let t6 = Date.now();
//     let result2 = await db.db.collection("listings").findOne({ _id: id });
//     totalRawMongoFetchListingTimeElapsed += Date.now() - t6;
//   }

//   let averageRawListingFetchSpeed =
//     totalRawFetchListingTimeElapsed / testIterations;
//   let averageRawBookedDatesFetchSpeed =
//     totalRawFetchBookedDatesTimeElapsed / testIterations;
//   let averageTotalRawFetchSpeed =
//     averageRawListingFetchSpeed + averageRawBookedDatesFetchSpeed;
//   console.log(`Average raw SQL Postgres fetch speed:
//     Listing: ${averageRawListingFetchSpeed}
//     BookedDates: ${averageRawBookedDatesFetchSpeed}
//     Total: ${averageTotalRawFetchSpeed}`);

//   let averageRawMongoListingFetchSpeed =
//     totalRawMongoFetchListingTimeElapsed / testIterations;
//   console.log(`Average MongoDB Native fetch speed:
//   Listing: ${averageRawMongoListingFetchSpeed}`);

//   expect(averageTotalRawFetchSpeed).toBeLessThanOrEqual(50);
//   expect(averageRawMongoListingFetchSpeed).toBeLessThanOrEqual(50);
// });

// test("Simultaneous Postgres KNEX fetching takes <= 50ms", async () => {
//   let totalSimultaneousFetchTimeElapsed = 0;

//   for (let i = 0; i < testIterations; i++) {
//     let id = randomNumberUpTo(idMax);

//     // POSTGRES SIMULTANEOUS KNEX FETCH
//     let t7 = Date.now();
//     let listing7 = await Promise.all([
//       knex
//         .select()
//         .from("bookings.listings")
//         .where("id", id)
//         .limit(1),
//       knex
//         .select()
//         .from("bookings.bookeddates")
//         .where("listing_id", id)
//     ]);
//     totalSimultaneousFetchTimeElapsed += Date.now() - t7;
//   }

//   let averageSimultaneousFetchTimeElapsed =
//     totalSimultaneousFetchTimeElapsed / testIterations;
//   console.log(`Average simultaneous Postgres fetch speed:
//     Total: ${averageSimultaneousFetchTimeElapsed}`);

//   expect(averageSimultaneousFetchTimeElapsed).toBeLessThanOrEqual(50);
// });

// test("Simultaneous raw SQL Postgres fetching takes <= 50ms", async () => {
//   let totalSimultaneousRawFetchTimeElapsed = 0;

//   for (let i = 0; i < testIterations; i++) {
//     let id = randomNumberUpTo(idMax);

//     // POSTGRES SIMULTANEOUS RAW KNEX FETCH
//     let t8 = Date.now();
//     let listing9 = await Promise.all([
//       knex.raw(`SELECT * FROM bookings.listings WHERE id = ? LIMIT 1`, [id]),
//       knex.raw(`SELECT * FROM bookings.bookeddates WHERE listing_id = ?`, [
//         id
//       ])
//     ]);
//     totalSimultaneousRawFetchTimeElapsed += Date.now() - t8;
//   }

//   let averageSimultaneousRawFetchTimeElapsed =
//     totalSimultaneousRawFetchTimeElapsed / testIterations;
//   console.log(`Average simultaneous raw SQL Postgres fetch speed:
//     Total: ${averageSimultaneousRawFetchTimeElapsed}`);

//   expect(averageSimultaneousRawFetchTimeElapsed).toBeLessThanOrEqual(50);
// });

describe("Write Query Speeds", () => {
  test("Postgres write takes <= 50ms", async () => {
    let totalListingTimeElapsed = 0;
    let totalBookedDatesTimeElapsed = 0;

    for (let i = 0; i < testIterations; i++) {
      let price = 50 + randomNumberUpTo(400);
      let maxguests = 1 + randomNumberUpTo(6);
      let minstay = 1 + randomNumberUpTo(2);
      let stars = (1 + Math.random() * 4).toFixed(2);
      let numratings = randomNumberUpTo(110);
      let listing = {
        price,
        maxguests,
        minstay,
        stars,
        numratings
      };

      let t1 = Date.now();
      let insertId = await knex("bookings.listings")
        .insert(listing)
        .returning("id");
      let timeElapsed1 = Date.now() - t1;
      totalListingTimeElapsed += timeElapsed1;

      insertId = insertId[0];
      await knex("bookings.listings")
        .where("id", insertId)
        .del();

      let bookedDatesArr = generateBookedDates(minstay, insertId);
      let t2 = Date.now();
      await knex.batchInsert("bookings.bookeddates", bookedDatesArr, 10000);
      let timeElapsed2 = Date.now() - t2;
      totalBookedDatesTimeElapsed += timeElapsed2;

      await knex("bookings.bookeddates")
        .where("listing_id", insertId)
        .delete();
    }

    let averageListingWriteSpeed = totalListingTimeElapsed / testIterations;
    let averageBookedDatesWriteSpeed =
      totalBookedDatesTimeElapsed / testIterations;
    let averageTotalWriteSpeed =
      averageBookedDatesWriteSpeed + averageListingWriteSpeed;
    console.log(`Average Postgres write speed:
        Listing: ${averageListingWriteSpeed}
        BookedDates: ${averageBookedDatesWriteSpeed}
        Total: ${averageTotalWriteSpeed}`);

    knex.destroy();
    expect(averageTotalWriteSpeed).toBeLessThanOrEqual(50);
  });

  test("Mongo Mongoose write takes <= 50ms", async () => {
    let totalTimeElapsed = 0;
    let { db, Listing } = await require("./../database/mongo.js");

    for (let i = 0; i < testIterations; i++) {
      let price = 50 + randomNumberUpTo(400);
      let maxGuests = 1 + randomNumberUpTo(6);
      let minStay = 1 + randomNumberUpTo(2);
      let stars = Number((1 + Math.random() * 4).toFixed(2));
      let numRatings = randomNumberUpTo(110);
      let bookedDates = generateBookedDates(minStay);
      let listingProps = {
        price,
        maxGuests,
        minStay,
        stars,
        numRatings,
        bookedDates
      };
      let newListing = new Listing(listingProps);
      let t1 = Date.now();
      let savedListing = await newListing.save();
      let timeElapsed = Date.now() - t1;
      totalTimeElapsed += timeElapsed;
      await Listing.deleteOne({ _id: savedListing._id });
    }

    let averageWriteSpeed = totalTimeElapsed / testIterations;
    console.log(`Average Mongo Mongoose write speed: ${averageWriteSpeed}`);

    db.close();
    expect(averageWriteSpeed).toBeLessThanOrEqual(50);
  });
});
