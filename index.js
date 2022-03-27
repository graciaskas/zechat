require("dotenv").config();
const cors = require("cors");
const logger = require("morgan");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const Socket = require("socket.io");
const PORT = 5000;

const io = Socket(server, { 
    cors: { 
        origin:"*",
        method: ["GET","POST"]
    }
});

const users = [];

io.on("connection", function(socket){
    /** On new user addition event */
    socket.on("addUser", function(user){
        //Set socket user to new user
        socket.user = user;
        // add new user
        users.push(user);
        //emit users to all sockets
        io.sockets.emit("users",users);
    });

    /** On new message  event */
    socket.on("message", function(message){
        //Emit to all sockets
        io.sockets.emit("message_client",{
            message,
            user : socket.user
        });
    });

    /** When user is disconnected */
    socket.on("disonnect", function(){
        if(socket.user){
            users.splice(users.indexOf(socket.user,1));
            io.sockets.emit("users",users);
        }
    });

});


app.use(express.static("client"))

server.listen(PORT, function(){
    console.log(`Server on http://localhost:${PORT}`)
});