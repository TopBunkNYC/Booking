CREATE SCHEMA bookings;

CREATE TABLE bookings.listings(
  id SERIAL PRIMARY KEY,
  price INT,
  maxGuests INT,
  minStay INT,
  stars NUMERIC(4,2),
  numRatings INT
);

CREATE TABLE bookings.bookedDates(
  id SERIAL PRIMARY KEY,
  date DATE,
  listing_id INT
);

