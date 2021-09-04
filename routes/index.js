const formRoute = require('./formRoute');
const loginRoute = require('./loginRoute');
const homeRoute = require('./homeRoute');
function route(app){
    app.use('/', formRoute);
    app.use('/login', loginRoute);
    app.use('/home', homeRoute);
}

module.exports = route;