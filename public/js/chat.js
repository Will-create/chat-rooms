var Chat = function(socket) {
    this.socket = socket;
}


// addinf a function for sending me.
Chat.prototype.sendMessage = function(room, text) {
    var message = {
        room: room,
        text: text
    }
    this.socket.emit("message", message);
}
Chat.prototype.changeRoom = function(room) {
    this.socket.emit('join', {
        newRoom: room
    })
}