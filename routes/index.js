const homeRoute = require('./homeRoute');
const loginRoute = require('./loginRoute');
function route(app){
    app.use('/', homeRoute);
    app.use('/login', loginRoute);
}

module.exports = route;