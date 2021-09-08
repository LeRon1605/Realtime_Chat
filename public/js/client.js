const socket = io();
const user = document.getElementById('username');
const userBox = document.getElementById('user-box');
const chatBox = document.getElementById('chat-box');
const message = document.getElementById('message');
const form = document.getElementById('message-form');
socket.on('connect', () => {
    socket.emit('user_connect', {
        userName: user.innerText,
        userID: socket.id
    });
    socket.on('newUser', (users) => {
        userBox.innerHTML = '';
        for (u of users){
            userBox.innerHTML += `
                <a href="?id=${u.userID}" class="list-group-item list-group-item-action list-group-item-light rounded-0">
                    <div class="media"><img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" alt="user" width="50" class="rounded-circle">
                        <div class="media-body ml-4">
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <h6 class="mb-0">${u.userName}</h6><small class="small font-weight-bold">14 Dec</small>
                            </div>
                            <p>Ê</p>
                        </div>
                    </div>
                </a>
                `
        }
    })
    form.onsubmit = (e) => {
        e.preventDefault();
        socket.emit('send_message', {
            userName: user.innerText,
            userID: socket.id,
            message: message.value, 
            sendAt: new Date()
        })
        message.value = '';
        message.focus();
    }
    socket.on('receive_message', (newMessage) => {
        const date = new Date(newMessage.sendAt);
        const datestring = date.getDate()  + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " +
        date.getHours() + ":" + date.getMinutes();
        chatBox.innerHTML += `
        <div class="media w-50 ml-auto mb-3">
            <div class="media-body">
                <div class="bg-primary rounded py-2 px-3 mb-2">
                    <p class="text-small mb-0 text-white">${newMessage.message}</p>
                </div>
                <p class="small text-muted">${datestring}</p>
            </div>
        </div>
        `
    })
})
