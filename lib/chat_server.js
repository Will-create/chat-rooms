var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};
exports.listen = function(server) {

    io = socketio.listen(server);
    io.set('log level', 1);

    io.sockets.on('connection', function(socket) {
        //assign to users guest name for when they connect
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);

        //  place user in lobby room when they connect.
        joinRoom(socket, 'Lobby');


        // handle message broadcasting to all users.
        handleMessageBroadcasting(socket, nickNames);


        // hnadle user message change, name change attempts and room creation attemps
        handleNameChangeAttempts(socket, nickNames, namesUsed);


        // handle room joining
        handleRoomJoining(socket);


        // provide user with occupied rooms on request
        socket.on('rooms', function() {
            socket.emit('rooms', io.sockets.manager.rooms);
        })


        // define clean up logic when user disconnects
        handleClientDisconnection(socket, nickNames, namesUsed);
    })


}