/**
 * modules dependencies.
 */
const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib')




let setServer = (server) => {

    //let allOnlineUsers = []

    let io = socketio.listen(server);

    let myIo = io.of('/')

    myIo.on('connection', (socket) => {

        console.log("on connection--emitting verify user");


       //Code for create functionality
       socket.on('create',(data)=>{
       console.log("The user from create event is:"+data);
       socket.broadcast.emit('createMessage', "Meeting created by"+" "+data);


       })

       socket.on('update',(data)=>{
        console.log("The user from create event is:"+data);
        socket.broadcast.emit('updateMessage', "Meeting updated by"+" "+data);
 
 
        })

    });

}







module.exports = {
    setServer: setServer
}
