const ws = require("ws");
const wss = new ws.Server({ noServer: true });

/*
message[0] is the actual contents of the message
message[1] is the client counter's current value
message[2] is the client who called for the broadcast's websocket.

we have message[2] because we can use it to check if we are sending
"A new user has connected" to the actual new user.
*/

// broadcast function to send a message to all connected clients
function broadcast(...message) {
    wss.clients.forEach(client => {
        if (client !== message[2]) {
            client.send(JSON.stringify([message[0], message[1]]));
            return;
        }

        client.send(JSON.stringify(["",message[1]]));
    });
}

module.exports = {wss, broadcast};