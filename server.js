const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 3000;

var app = express();
app.use(cors());
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/api/timestamp/:date_string', (req, res) => {
  var {date_string} = req.params;
  console.log(typeof date_string);
  var date_stringParsed = JSON.stringify(date_string);
  // var date_stringNotParsed = JSON.parse(date_string);
  console.log(date_stringParsed);
  var date_Stringdate = new Date(date_stringParsed);
  var date = new Date(date_string);
  var unix = date.getTime();
  var utc = date.toUTCString();
  if (utc == "Invalid Date") {
    // date_stringParsed = JSON.stringify(date_stringParsed);
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
