var knex = require("knex")({
  client: "pg",
  version: "10.5",
  connection: {
    host: "54.160.22.131",
    user: "postgres",
    database: "topbunk"
  },
  pool: { min: 2, max: 10 }
});

module.exports = knex;
