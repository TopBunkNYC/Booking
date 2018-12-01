require("newrelic");

const express = require("express");
const bodyParser = require("body-parser");
const database = require("../database/index.js");
const path = require("path");
const port = 9006;
const morgan = require("morgan");
const cors = require("cors");
let models = require("./../database/models");
const Booking = require("./../client/dist/bundle-server").default;
const React = require("react");
const ReactDOMServer = require("react-dom/server");

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

const ssr = async id => {
  let props = await models.getListing(id);
  let component = React.createElement(Booking, props);
  let ssr_html = ReactDOMServer.renderToString(component);
  return { ssr_html, props };
};

app.get("/listing", async (req, res) => {
  let { ssr_html, props } = await ssr(req.query.id);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Booking</title>
        <link type="text/css" rel="stylesheet" href="guestBar.css" />
        <link type="text/css" rel="stylesheet" href="_datepicker.css" />
        <link type="text/css" rel="stylesheet" href="flexboxgrid2.css" />
      </head>
      <body>
        <div id="booking">${ssr_html}</div>

        <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
        <script type="text/javascript" src="bundle.js"></script>
        <script>
          ReactDOM.hydrate(
            React.createElement(Booking, ${JSON.stringify(props)}),
            document.getElementById('booking')
          );
        </script>
      </body>
    </html>
  `);
});

// src="https://s3.amazonaws.com/topbunk/bundle.js">

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/dist/index.html"));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// app.listen(process.env.PORT)
