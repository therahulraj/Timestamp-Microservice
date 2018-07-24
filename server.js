const express = require('express');

const port = process.env.PORT || 3000;

var app = express();


app.get('/api/timestamp/:date_string', (req, res) => {
  var {date_string} = req.params;
  var date_stringParsed = JSON.parse(date_string);
  var date_Stringdate = new Date(date_stringParsed);
  var date = new Date(date_string);
  var unix = date.getTime();
  var utc = date.toUTCString();
  if (utc == "Invalid Date") {
    if ("Invalid Date" != new Date(date_stringParsed).toUTCString()) {
      return res.send({
        unix: date_Stringdate.getTime(),
        utc: date_Stringdate.toUTCString()
      })
    }
    return res.send({
      error: "Invalid Date"
    })
  }
  res.send({
    unix,
    utc
  })

})

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
})
