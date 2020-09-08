let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let chatSocketRouter = require('./routes/chatSocket');
let filesRouter = require('./routes/upload/index');
let routers = require("./routes/index");

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routers);
app.use('/websocket', chatSocketRouter);
app.use('/files', filesRouter);

module.exports = app;
