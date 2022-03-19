console.log("loaded...!");

const socket = io('http://localhost:5000');

socket.emit("ping", { 
    message : "Hello it me !"
});

socket.on("message", function(data){
    console.log(data);
});