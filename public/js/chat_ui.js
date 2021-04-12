function divEscapedContentElement(message){
return $('<div></div>').text(message);
    
}

function divSystemContentElement(message){
    return $('<div></div>').html('<i>'+message+'</i>');
}
function processUserInput(chatApp,socket){
    var message = $('#send-message').val();
    var systemMessage;
    if(message.charAt(0) == '/'){
        systemMessage = Chat.processCommand(message);
        if(systemMessage){
        $('#messages').append(divSystemContentElement(systemMessage));    
        }
    }else{
    chatApp.sendMessage($("#room").text(), message);
        $('#messages').append(divEscapedContentElement(message));
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));

        
    }
    return $('#messages').val()

}

var socket = io.connect();

$(document).ready(function(){
    var chatApp = new Chat(socket);


socket.on(function(){
    
})
})