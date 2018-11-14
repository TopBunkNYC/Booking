const randomNumberUpTo = (limit) => Math.floor(Math.random() * limit);

module.exports = function generateBookedDates(minStay, listing_id) {

  // create objects to map months to corresponding number of days in month and to year
  let months = [11,12,1,2];
  let daysInMonth = {
    11: 30,
    12: 31,
    1: 31,
    2: 28
  }
  let monthToYear = {
    11: 2018,
    12: 2018,
    1: 2019,
    2: 2019
  }

  // create array of all possible days for booking (all days Nov '18 through Feb '19)
  let days = [];
  for (let month of months) {
    for (let day = 1; day < daysInMonth[month] + 1; day++) {
      dayString = day.toString()
      if (dayString.length === 1) {
        dayString = '0' + dayString;
      }
      monthString = month.toString()
      if (monthString.length === 1) {
        monthString = '0' + monthString;
      }
      days.push(`${monthToYear[month]}-${monthString}-${dayString}`)
    }
  }

  let bookedDates = [];
  let curDay = 0;
  curDay += randomNumberUpTo(10);
  while (curDay < days.length - 1 - minStay) {
    // ensure length of stay conforms to minStay rule for listing
    let numDays = minStay + randomNumberUpTo(3);
    let startingDay = curDay;
    // add stays of random lengths with random gaps in between until end of available booking period
    for (let dayOfStay = curDay; dayOfStay < (startingDay + numDays); dayOfStay++) {
      // use bookedDate format for either Postgres or Mongo
      if (listing_id === undefined) {
        var bookedDate = days[dayOfStay];
      } else {
        var bookedDate = {
          date: days[dayOfStay],
          listing_id
        }
      }
      bookedDates.push(bookedDate);
      curDay++;
    }
    curDay += randomNumberUpTo(10);
  }
  return bookedDates;
};