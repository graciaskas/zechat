const socket = io('http://localhost:5000');

const form_chat = document.querySelector(".chat-input");
const form_chat_input = form_chat.firstElementChild;
const chat_list = document.querySelector(".chat-list");
const users_list = document.querySelector(".users_list");

const form_login = document.querySelector(".form_login");
const form_login_input = form_login.firstElementChild.firstElementChild;

const messages = [];
let users = [];

socket.on("message_client", function(message) {
    messages.push(message);
    updateMessages();
});

socket.on("users", function(_users) {
    users = _users;
    updateUsers();
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

form_login.onsubmit = function(e) {
    e.preventDefault();
    let username = form_login_input.value;
    
    if(!username) {
        alert("username is required !");
        return;
    }
    
    socket.emit("addUser", {username});
    form_login_input.value = null;
    form_login.classList.add("d-none");
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
                    ${message.user.username}
                </div>
            </div>
        `
    });
}

function updateUsers(){
    users_list.textContent = "";
    users.forEach( user => { 
        users_list.innerHTML += `
            <div class="user">
                <div class="u_img">
                    <img src="./src/gracias.jpg" alt="">
                    <span class="u_status"></span>
                </div>
                <div class="u_content">
                    <h4>${user.username}</h4>
                </div>
            </div>
        `
    });
}
