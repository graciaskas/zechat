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

io.on("connection", function(socket){
    // Get ping event
    socket.on("ping",function(data){
        console.log(data)
    });

    socket.on("message", function(message){
        //Emit to all sockets
        io.sockets.emit("message_client",{
            message
        });
    });
   
});

app.use(express.static("client"))

server.listen(PORT, function(){
    console.log(`Server on http://localhost:${PORT}`)
});