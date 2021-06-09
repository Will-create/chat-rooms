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
    });


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

    function joinRoom(socket, room) {
        socket.join(room);
        currentRoom[socket.id] = room;
        socket.emit('joinResult', {
            room: room
        });
        socket.broadcast.to(room).emit('message', {
            text: nickNames[socket.id] + ' has join ' + room + '.'
        });
        var usersInRoom = io.sockets.clients(room);
        if (usersInRoom.length > 1) {
            usersInRoomSummary = 'Users currently in room ' + room + ' are : ';

            for (var index in usersInRoom) {
                var userSocketId = usersInRoom[index].id;
                if (userSocketId != socket.id) {
                    if (userSocketId > 0) {
                        usersInRoomSummary += ', ';
                    }
                    usersInRoomSummary += nickNames[userSocketId];
                }
            }
            usersInRoomSummary += '. ';
            socket.emit('message', {
                text: usersInRoomSummary
            })
        }
    }

}