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
clients = 0;
usernames = []
wss.on('connection', ws => {
    clients++;
    // next line has the ws argument because broadcast will check if it's sending this to the new client
    broadcast("<i style='color:#111'>A new user has connected<i>", clients, ws);

    ws.on('close', () => {
        clients--;
        usernames.splice(ws.username);
        broadcast("<i style='color:#111'>A user has disconnected<i>", clients); 
    });

    ws.on('message', msg => {
        // checking if new username is a duplicate
        msg = msg.toString().split(',');
        if (msg[0] == "username_req" && usernames.includes(msg[1])) {
            ws.send("false"); return; // sending a string instead of bool because websocket doesn't let me send bool
        } else if (msg[0] == "username_req" && !usernames.includes(msg[1])) {
            ws.send("true");
            usernames.push(msg[1]);
            ws.username = msg[1];
            return;
        }

        broadcast(msg.toString(), clients);
    });
});

module.exports = router;