const socket = require('socket.io');
console.log("Hi");

const socketController = (socket) => {

    socket.on('connect',()=>{
        console.log(payload);
    })
socket.emit('message',"Hi Joel")

socket.on('a',payload=>{
    console.log(payload);
})
}

module.exports = {
    socketController
}
