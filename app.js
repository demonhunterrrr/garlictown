var express = require('express');
var path = require('path');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.static(path.join(__dirname, 'public/home/')));

module.exports = app;
app.listen(80, () => {
  console.log("garlictown.com listening on port 80. Woohoo!");
})