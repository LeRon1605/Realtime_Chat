require('dotenv').config();
const express = require('express');
const app = express();
const flash = require('connect-flash');
const exphbs  = require('express-handlebars');
// Setup https server
const https = require('https');
const fs = require('fs');
const httpsOptions = {
    key: fs.readFileSync('./key/server.key'),
    cert: fs.readFileSync('./key/server.cert')
};
const server = https.createServer(httpsOptions, app);

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const io = require('socket.io')(server);
const rootIO = require('./client')(io);
// Connect to database
const db = require('./db/connect');
db.connect();

const session = require('express-session');
app.use(session({ cookie: { maxAge: 60000 }, 
    secret: process.env.SECRET_SESSION,
    resave: false, 
    saveUninitialized: false
}));
app.use(flash());
// Using static files and bodyParser
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
// Setup routes
const routes = require('./routes/index');
routes(app);
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// 

// Catch 404 
app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
})
// Error handler
app.use((error, req, res, next) => {
    const status = error.status || 500;
    res.status(status).json({
        error: error.message
    })
})

server.listen(3000, () => console.log(`Listening on port 3000`));
