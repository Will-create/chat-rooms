var socketio = {
    id: 'odnjcqzklmdjfbqk',
    name: 'Websocket',
    emit: function(eventName, message) {
        return message;
    }
}
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};


function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
    var name = 'Guest' + guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult', {
        success: true,
        name: name
    })
    namesUsed.push(name);

    return guestNumber + 1;

}

function test(callback) {
    callback(assignGuestName(socketio, guestNumber, nickNames, namesUsed));
}
while (true) {
    test(function(guestNumber) {
        console.log(guestNumber);
        console.log(nickNames);
        console.log(namesUsed);
    });
}