var express = require('express');
var ws = require("ws");
var path = require('path');
var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

// static files
app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.static(path.join(__dirname, 'public/home/')));

// routes
const entropyRouter = require('./routes/entropy'); // entropy chat thing
app.use('/entropy', entropyRouter);

const dinoRouter = require('./routes/dino'); // dino game
app.use('/dino', dinoRouter);

const headlineRouter = require('./routes/headliners'); // guess the fake news headline
app.use('/headline', headlineRouter);

const server = app.listen(80, () => {
  console.log("garlictown.com listening on port 80. Woohoo!");
})

// setting up entropy websocket
const {wss} = require('./websocket.js');
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, socket => {
    wss.emit('connection', socket, request);
  });
});

module.exports = app;