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
module.exports = {
    users,
    isExistUser,
    disconnectUser
}