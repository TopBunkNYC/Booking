# Booking Service

This service allows users to see a TopBunk listing's average rating and to select free dates for booking.

## Related Projects

- [https://github.com/TopBunkNYC/Description](https://github.com/TopBunkNYC/Description)
- [https://github.com/TopBunkNYC/Neighborhood](https://github.com/TopBunkNYC/Neighborhood)
- [https://github.com/TopBunkNYC/Reviews](https://github.com/TopBunkNYC/Reviews)
- [https://github.com/TopBunkNYC/Proxy_Wyatt](https://github.com/TopBunkNYC/Proxy_Wyatt)

## Getting Started

### Downloading dependencies

```
npm install
```

### Setting up database

The booking service uses a PostgreSQL database (though you can use an alternative by making adjustments).

First, make sure you have PostgreSQL installed and that the PostgreSQL server is running. [PostgreSQL: Getting Started](https://www.postgresql.org/docs/10/tutorial-install.html)

Next, update the host IP address for your PostgreSQL database server in `database/index.js`

Next, create your database and tables.

```
npm run init-db
```

Finally, you need to generate dummy data and seed it into your database. Note: This could take a few hours, depending on your computer's speed.

```
npm run seed-db
```

### Launching the application locally

From within the root directory, run webpack to build the client bundle

```
npm run react-prod
```

You can either rely on your server to serve the client bundle from your static folder, `client/dist`, or you can use a CDN.

If needed, update the path to the client bundle on line 75 of `server/index.js`.

Start the server on localhost

```
npm run server-dev
```

Access a listing page by navigating to [http://localhost:9005/listings?id=#](http://localhost:9005/listings?id=#), where # represents the listing id and can be any integer from 1 to 10M. For example, listing 246 would be [http://localhost:9005/listings?id=246](http://localhost:9005/listings?id=246)

If everything is working correctly, you should see something like the below (your data will almost certainly be different).

<img src="https://github.com/TopBunkNYC/Booking/blob/csr2/images/screenshot.png" width="400">

## API

### GET /bookinglisting

Will return information about the listing with the provided id.

Query parameter: `id` (number)

Example response for `GET /bookinglisting/?id=2948279`:

```
  {
    "id": 2948279, # the listing id
    "price": 184, # the nightly base price
    "maxguests": 2, # the maximum number of guests allowed
    "minstay": 2, # the minimum allowed length of a booking
    "stars": "1.61", # the average guest rating
    "numratings": 101, # the number of guest ratings this listing has received
    "dates": [ # dates that are currently booked
        "2018-11-02T04:00:00.000Z",
        "2018-11-03T04:00:00.000Z",
        "2018-11-04T04:00:00.000Z",
        "2018-11-05T05:00:00.000Z",
        "2018-11-06T05:00:00.000Z",
        "2018-11-14T05:00:00.000Z",
        "2018-11-15T05:00:00.000Z",
        "2018-11-17T05:00:00.000Z",
        "2018-11-18T05:00:00.000Z",
        "2018-11-19T05:00:00.000Z",
        "2018-11-20T05:00:00.000Z",
        "2018-11-30T05:00:00.000Z",
        "2018-12-01T05:00:00.000Z",
        "2018-12-05T05:00:00.000Z",
        "2018-12-06T05:00:00.000Z",
        "2018-12-07T05:00:00.000Z",
        "2018-12-17T05:00:00.000Z",
        "2018-12-18T05:00:00.000Z",
        "2018-12-19T05:00:00.000Z",
        "2018-12-24T05:00:00.000Z",
        "2018-12-25T05:00:00.000Z",
        "2018-12-29T05:00:00.000Z",
        "2018-12-30T05:00:00.000Z",
        "2018-12-31T05:00:00.000Z",
        "2019-01-01T05:00:00.000Z",
        "2019-01-11T05:00:00.000Z",
        "2019-01-12T05:00:00.000Z",
        "2019-01-13T05:00:00.000Z",
        "2019-01-14T05:00:00.000Z",
        "2019-01-22T05:00:00.000Z",
        "2019-01-23T05:00:00.000Z",
        "2019-01-24T05:00:00.000Z",
        "2019-01-27T05:00:00.000Z",
        "2019-01-28T05:00:00.000Z",
        "2019-01-30T05:00:00.000Z",
        "2019-01-31T05:00:00.000Z",
        "2019-02-01T05:00:00.000Z",
        "2019-02-10T05:00:00.000Z",
        "2019-02-11T05:00:00.000Z",
        "2019-02-12T05:00:00.000Z",
        "2019-02-13T05:00:00.000Z",
        "2019-02-19T05:00:00.000Z",
        "2019-02-20T05:00:00.000Z",
        "2019-02-21T05:00:00.000Z"
    ]
  }
```

### POST /bookinglisting

Will create a listing based upon the request body.

Body parameter: JSON object with the following required fields

- `price` (number)
- `maxguests` (number)
- `minstay` (number)

Example usage:

```
Request body:

  {
    "price":999,
    "maxguests": 4,
    "minstay": 4
  }
Response:

  # listing_id of inserted listing, as the only element in an array
  [
      10049466
  ]
```

### PUT /bookinglisting

Will update the listing with the provided id.

Query parameter: `id` (number)

Request body parameter: JSON object with desired updates

Example usage:

    Request:

      URL: /bookinglisting?id=10009612

      Request.body:
        {
          "minStay": 10
        }

    Response:

      // string number of listings updated (should be "1" or "0")
      `"1"`

### DELETE /bookinglisting

Will delete the listing with the provided id.

Query parameter: `id` (number)

Example response to DELETE /bookinglisting=?id=10009612:

    // the number of deleted listings (should be "1" or "0")
    "1"
