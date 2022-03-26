const socket = io('http://localhost:5000');

const form_chat = document.querySelector(".chat-input");
const form_chat_input = form_chat.firstElementChild;
const chat_list = document.querySelector(".chat-list");

let messages = [];

socket.on("message_client", function(message) {
    messages.push(message);
    updateMessages();
});


form_chat.onsubmit = function(e) {
    e.preventDefault();
    let message = form_chat_input.value;
    
    if(!message) {
        alert("no message please write a message");
        return;
    }

    socket.emit("message", message);
    form_chat_input.value = null;
}


function updateMessages(){
    chat_list.textContent = "";

    messages.forEach( message => { 
        chat_list.innerHTML += `
            <div class="chat-message sender">
                <div class="image">
                    <img src="./src/gracias.jpg" alt="">
                </div>
                <div class="message">
                    ${message.message}
                </div>
            </div>
        `
    });
}
