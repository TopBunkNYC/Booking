CREATE SCHEMA bookings;

DROP TABLE bookings.listings;

CREATE TABLE bookings.listings(
  id SERIAL PRIMARY KEY,
  price INT,
  maxGuests INT,
  minStay INT,
  stars NUMERIC(4,2),
  numRatings INT
);

DROP TABLE bookings.bookedDates;

CREATE TABLE bookings.bookedDates(
  id SERIAL PRIMARY KEY,
  date DATE,
  listing_id INT
);

