
// getting username
$('#username').dialog({
    modal: true,
    draggable: false,
    resizable: false,
});

// listening for username submitions
$('#username_form').on("submit", e => {
    username  = $('#username_input').val();
    ws.send(["username_req",username]);
    e.preventDefault()
});

// setting up websocket
const ws = new WebSocket("ws://localhost:80");

ws.addEventListener("message", msg => {
    // checking if msg is the username list
    if (msg.data == "false") {
        $("#username_info").text(`Sorry, but the username "${username}" is already being used. Please choose another one.`);
        return;
    } if (msg.data == "true") {
        $('#username').dialog("close");
        return;
    }

    // parsing msg into json, which is sent as a string
    msg = JSON.parse(msg.data);

    // creating new message on page
    $("#messages").append(`<p>${msg[0]}</p>`);

    // adding to client counter
    $("#client_counter").text(msg[1]);
});

// listening for message submitions
$('#message_form').on("submit", e => {
    // sending data to websocket
    ws.send(`[${username}] ${$('#message').val()}`);

    // making page not reload
    e.preventDefault();
    $("#message_form").trigger("reset");
});