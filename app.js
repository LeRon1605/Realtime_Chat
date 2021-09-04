const express = require('express');
const app = express();
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

// Connect to database
const db = require('./db/connect');
db.connect();

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
    console.log(error);
    const status = error.status || 500;
    res.status(status).json({
        error: error.message
    })
})
server.listen(3000, () => console.log(`Listening on port 3000`));