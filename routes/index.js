const formRoute = require('./formRoute');
const loginRoute = require('./loginRoute');
const logoutRoute = require('./logoutRoute');
const homeRoute = require('./homeRoute');
function route(app){
    app.use('/', formRoute);
    app.use('/login', loginRoute);
    app.use('/logout', logoutRoute);
    app.use('/home', homeRoute);
}

module.exports = route;