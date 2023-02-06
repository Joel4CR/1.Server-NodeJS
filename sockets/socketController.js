const jwt_decode= require('jwt-decode');
const {Socket} = require('socket.io');
const { checkJWT } = require('../helpers/jwebtoken');
const ChatMessage = require('../models/chats');
const Users = require("../models/users");


const chatMessage= new ChatMessage()

const socketController=async(socket=new Socket(), io)=>{


    console.log(socket.handshake.address)

    const user=await checkJWT(socket.handshake.headers['x-token'])

    if (!user) {
        return socket.disconnect();
    }

    console.log("Se conecto", user.name);

    //Add user
    chatMessage.connectUser(user)
    //Send Users coonnected
    io.emit('users-online', chatMessage.userArray)

    //Delete users desconnected
    socket.on('disconnect',()=> {
        chatMessage.disconnectUser(user.id)
        io.emit('users-online', chatMessage.userArray)
    })

    socket.on('send-msg', ({uid,msg})=>{
        chatMessage.sendMessage(uid,user.name,msg)
        io.emit('recive-msg',chatMessage.showLast10)
    })

}


module.exports = {socketController}