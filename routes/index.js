const formRoute = require('./formRoute');
const loginRoute = require('./loginRoute');
const registerRoute = require('./registerRoute');
const logoutRoute = require('./logoutRoute');
const homeRoute = require('./homeRoute');
function route(app){
    app.use('/', formRoute);
    app.use('/login', loginRoute);
    app.use('/register', registerRoute);
    app.use('/logout', logoutRoute);
    app.use('/home', homeRoute);
}

module.exports = route;