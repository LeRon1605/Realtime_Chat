const socket = io();
const user = document.getElementById('username');
const userBox = document.getElementById('user-box');
const chatBox = document.getElementById('chat-box');
const message = document.getElementById('message');
const form = document.getElementById('message-form');
const image = document.getElementById('image');
const userID = document.getElementById('user-id');
let receiverID;
let receiverSocket;
const getSocket = async function(e, event){
    event.preventDefault();
    receiverSocket = e.dataset.socketid;
    receiverID = e.dataset.id;
    const res = await fetch(`https://localhost:3000/message/private?senderID=${userID.innerText}&receiverID=${receiverID}`)
    let messages = await res.json();
    messages = messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    chatBox.innerHTML = '';
    for (mes of messages){
        if (mes.senderID === userID.innerText) {
            renderNewSenderMessage({
                sendAt: mes.createdAt,
                message: mes.message
            })
        }else{
            renderNewReceiverMessage({
                sendAt: mes.createdAt,
                message: mes.message,
                image: mes.senderImage
            })
        }
    }
    console.log(messages);
}
function renderNewReceiverMessage(newMessage){
    const date = new Date(newMessage.sendAt);
    const datestring = date.getDate()  + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " +
    date.getHours() + ":" + date.getMinutes();
    chatBox.innerHTML += `
        <div class="media w-50 mb-3"><img src="${newMessage.image}" alt="user" width="50" class="rounded-circle">
            <div class="media-body ml-3">
                <div class="bg-light rounded py-2 px-3 mb-2">
                    <p class="text-small mb-0 text-muted">${newMessage.message}</p>
                </div>
                <p class="small text-muted">${datestring}</p>
            </div>
        </div>
    `;
}
function renderNewSenderMessage(newMessage) {
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
    `;
    message.value = '';
    message.focus();
}
socket.on('connect', () => {
    receiverSocket = socket.id;
    socket.emit('user_connect', {
        userID: userID.innerText,
        userName: user.innerText,
        userSocket: socket.id,
        image: image.src
    });
    socket.on('renderUser', (users) => {
        userBox.innerHTML = '';
        for (u of users){
            if (u.userSocket === socket.id) continue;
            userBox.innerHTML += `
                <a href="?id=${u.userSocket}"class="list-group-item list-group-item-action list-group-item-light rounded-0 id-message" data-id="${u.userID}" data-socketid= "${u.userSocket}" onclick=getSocket(this,event)>
                    <div class="media"><img src="${u.image}" alt="user" width="50" class="rounded-circle">
                        <div class="media-body ml-4">
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <h6 class="mb-0">${u.userName}</h6><small class="small font-weight-bold">14 Dec</small>
                            </div>
                            <p>Ê</p>
                        </div>
                    </div>
                </a>
            `;
        }
    })
    form.onsubmit = (e) => {
        e.preventDefault();
        const senderMessage = {
            senderID: userID.innerText,
            receiverID: receiverID,
            receiverSocket,
            message: message.value,
            image: image.src,
            sendAt: new Date()
        }
        renderNewSenderMessage(senderMessage);
        socket.emit('send_private_message', senderMessage);
        
    }
    socket.on('receive_private_message', (receiverMessage) => {
        renderNewReceiverMessage(receiverMessage);
    });
    socket.on('reloadUser', () => {
        socket.emit('loadUser', {
            userName: user.innerText,
            userID: socket.id
        })
    })
})
