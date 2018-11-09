let knex = require('./../database/index.js');

const randomNumberUpTo = (limit) => Math.floor(Math.random() * limit);

let id = randomNumberUpTo(10000000);

test('fetching listing takes <= 50ms', async () => {
  let t1 = Date.now();
  await knex.select().from('bookings.listings').where('id', id);
  let timeElapsed = Date.now() - t1;
  expect(timeElapsed).toBeLessThanOrEqual(50);
})