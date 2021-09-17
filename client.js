const Message = require('./db/models/message');
const User = require('./db/models/user');

const users = [];

const isExistUser = (userName) => {
    return users.map(user => user.userName).indexOf(userName);
}
const disconnectUser = (socketID) => {
    const index = users.map(user => user.userID).indexOf(socketID);
    if (index != -1) {
        users.splice(index, 1);
    }
}
const renderUser = (userName) => {
    return users.filter(user => user.userName !== userName);
}

module.exports = (io) => {
    io.on('connection', (socket) => {
    socket.on('user_connect', (data) => {
        const index = isExistUser(data.userName);
        if (index == -1) users.push(data);
        else users[index] = data;
        console.log(data);
        io.emit('renderUser', users);
    })
    socket.on('send_private_message', async (data) => {
        try{
            const receiver = await User.findById(data.receiverID);
            const sender = await User.findById(data.senderID);
            if (receiver && sender && receiver._id !== sender._id){
                io.to(data.receiverSocket).emit('receive_private_message', data);
                const newMessage = new Message({
                    senderID: sender._id,
                    receiverID: receiver._id,
                    senderImage: sender.image,
                    receiverImage: receiver.image,
                    message: data.message
                });
                await newMessage.save();
                console.log('Saved');
            }          
        }catch(err){
            console.log(err);
        }
    })
    socket.on('disconnect', () => {
        console.log('disconnect');
        disconnectUser(socket.id);
        io.emit('renderUser', users);
    })
})
}