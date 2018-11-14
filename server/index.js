const express = require("express");
const bodyParser = require("body-parser");
const database = require("../database/index.js");
const path = require("path");
const port = 4000;
const morgan = require("morgan");
const cors = require("cors");
let models = require("./../database/models");

var app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname + "/../client/dist")));

app.get("/bookinglisting", (req, res) => {
  id = req.query.id;
  models
    .getListing(id)
    .then(listing => res.send(listing))
    .catch(err => res.send(err));
});

app.post("/bookinglisting", (req, res) => {
  models
    .postListing(req.body)
    .then(listing => res.send(listing))
    .catch(err => res.status(400).send(err));
});

app.put("/bookinglisting", (req, res) => {
  models
    .updateListing(req.query.id, req.body)
    .then(listing => res.send(listing))
    .catch(err => res.status(400).send(err));
});

app.delete("/bookinglisting", (req, res) => {
  models
    .deleteListing(req.query.id)
    .then(listing => res.send(listing))
    .catch(err => res.status(400).send(err));
});

// app.use('/bundle.js', express.static(path.join(__dirname + '/../client/dist')));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/dist/index.html"));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// app.listen(process.env.PORT)
