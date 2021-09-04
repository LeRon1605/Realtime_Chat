const mongoose = require('mongoose');
function connect(){
   mongoose.connect('mongodb://localhost:27017/chat', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Connect successfully to mongoDB'))
        .catch((err) => console.log(`Connect failure to mongoDB: ${err}`)) 
}


module.exports = {
    connect
}