const ws = new WebSocket("ws://localhost:80");

ws.addEventListener("message", msg => {
    new_message = document.createElement('p');
    new_message.innerText = msg.data;
    document.getElementById("messages").append(new_message);
});

document.getElementsByTagName('form')[0].addEventListener("submit", e => {
    // sending data to websocket
    ws.send(document.getElementById('message').value);

    // making page not reload
    document.getElementsByTagName("form")[0].reset();
    e.preventDefault();
});