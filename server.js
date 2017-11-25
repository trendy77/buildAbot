var https = require('https');
var http = require('http');
// The following are needed to enable parsing of the body sent to the webhook (FACEBOOK?)
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended:false})
var request = require('request');
var app = express();
var cookieParser = require('cookie-parser')
// load the cookie-parsing middleware
app.use(cookieParser())
app.use(bodyParser.json())



const login = require("facebook-chat-api");