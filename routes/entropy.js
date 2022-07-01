const express = require("express");
const ws = require("ws");
const router  = express.Router();
const {wss} = require("./../websocket.js");
const {broadcast} = require("./../websocket.js");
// http requests
router.get("/", (req, res) => {
    res.render('../public/entropy/index');
});

// websockets
wss.on('connection', ws => {
    broadcast("A new user has connected!!!");

    ws.on('close', () => {
        broadcast("A user has disconnected 😭😭😭");
    });

    ws.on('message', msg => {
        broadcast(msg.toString());
    });
});

module.exports = router;