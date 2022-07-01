const ws = require("ws");
const wss = new ws.Server({ noServer: true });

function broadcast(message) {
    wss.clients.forEach(client => {
        client.send(message);
    });
}

module.exports = {wss, broadcast};