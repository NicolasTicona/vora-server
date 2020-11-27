var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var dashboard = require('./routes/dashboard/dashboard.service');
var workspace = require('./routes/workspace/workspace.service');
var users = require('./routes/users/users.service');

var app = express();

app.options('*', cors({
    origin: '*',
    methods: 'GET,POST',
    allowedHeaders: '*' 
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/dashboard', cors(), dashboard);
app.use('/api/workspace', cors(), workspace);
app.use('/api/users', cors(), users);

module.exports = app;
