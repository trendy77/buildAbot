
//DASHBOT
	// brit11		// goto HERE ON DASHBOT to register each bot and get API Key
// https://www.dashbot.io/bots
// orgmy.biz/bee   @ API f9dvi7u2KniQPbOe6xiiEByyrbtbzTVh00934dnt
// orgmy.biz/dex   @ API tYHt9aaRI2JkGrt74ViUcpSKi1sITBzAm0ylvYOr

// npm install --save dashbot



const dashbotApiMap = {
  facebook: process.env.DASHBOT_API_KEY_FACEBOOK,
  kik: process.env.DASHBOT_API_KEY_KIK,
  webchat: process.env.DASHBOT_API_KEY_GENERIC,
  skype: process.env.DASHBOT_API_KEY_GENERIC
}
const dashbot = require('dashbot')(dashbotApiMap).webchat
//dashbot.setFacebookToken(process.env.FACEBOOK_PAGE_TOKEN) // only needed for Facebook Bots
bot.use(dashbot)

const fs = require("fs");

var express = require('express');
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
// The dashbot Bot Key you created above goes here:
var dashbotKey = dashbotApiMap.webchat;
var router = express.Router();

app.post('/', function(req, res) {
  const text = req.body.text;
  console.log(text)
  const sentFrom = req.body.threadID;
  
  dashbot.logIncoming(
    dashbot.messageUtil.messageWithText(sentFrom, text)
);
  
  res.send('worked');
});
var port = 4000;
app.listen(port);


'use strict';

if (!process.env.DASHBOT_API_KEY_GENERIC) {
  throw new Error('"DASHBOT_API_KEY_GENERIC" environment variable must be defined');
}



function askUser(threadID, eventText) {
  request({
    uri: process.env.DASHBOT_URL_ROOT,
    qs : {
      type: 'outgoing',
      platform: 'generic',
      apiKey: process.env.DASHBOT_API_KEY_GENERIC,
      v: version
    },
    method: 'POST',
    json: {
      text: eventText,
      userId: threadID
    }
  });
   handleMsgs(gapi);
}
  function  (question, function(answer) {
    request({
      uri: process.env.DASHBOT_URL_ROOT,
      qs : {
        type: 'incoming',
        platform: 'generic',
        apiKey: process.env.DASHBOT_API_KEY_GENERIC,
        v: version
      },
      method: 'POST',
      json: {
        text: answer,
        userId: 'Joe'
      }
    });
     ask('you say: ' + answer + '. What else? ');
  }



// Global access variables
let gapi, active, target, rl;
var eventObject;

try {
	// Look for stored appstate first
	login({ "appState": JSON.parse(fs.readFileSync("brit11state.json", "utf8")) }, callback);
} catch (e) {
	// If none found (or expired), log in with email/password
	try {
		// Look for stored credentials in a gitignored credentials.js file
		const credentials = require("/b11credentials.js");
		logInWithCredentials(credentials);
	} catch (e) {
		// If none found, ask for them
		const credentials.email = "britneyharte87@gmail.com";
		const credentials.pass = "Joker999";
				// Store credentials for next time
				fs.writeFileSync("b11credentials.js", `exports.email = "${credentials.email}";\nexports.password = "${credentials.pass}";`);
			// Pass to the login method (which should store an appstate as well)
				const credentials = require("./b11credentials.js");
				logInWithCredentials(credentials);
		}
}

/*
	FACEBOOK MESSENGER LOGIN...
*/
function logInWithCredentials(credentials, callback = handleMsgs) {
	login({ "email": credentials.email, "password": credentials.password }, (err, api) => {
		if (err) return console.error(err);
		fs.writeFileSync("brit11state.json", JSON.stringify(api.getAppState()));
		callback(api);
	});
}
// LISTEN FOR MESSAGES
function handleMsgs(api) {
	api.setOptions({ "logLevel": "silent", "listenEvents": false, "updatePresence": true});
	gapi = api;
	api.listen((err, event) => {
		      switch(event.type) {
				case "message":
					sendtoDash( event.threadID, event.body);
					api.sendMessage("TEST response- you said? " + event.body, event.threadID);
					break;
          
				case "event":
                console.log(event);
                break;
			}
		}); 
}

function sendtoDash(sender, text) {
  messageData = {
    text:text
  }
  const requestData = {
    url: 'https://tracker.dashbot.io/track?platform=generic&v=9.3.0-rest&type=incoming&apiKey=f9dvi7u2KniQPbOe6xiiEByyrbtbzTVh00934dnt',
    userId: sender,
    method: 'POST',
    json: {
      recipient: {sender},
      message: messageData,
    }
  }
  request(requestData, function(error, response, body) {
      // Handle error
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

function sendToUser(msg, threadId, callback = handleMsgs, api = gapi) {
	api.sendMessage(msg, threadId, (err) => {
		if (!err) {
			console.log("(sent)");
		} else {
			console.log("(not sent)");
		}	
		callback(api);			// Optional callback
	});
}









// SERVER SETUP --- DEFINE THE ENDPOINTS AND ENABLE THE SERVER TO LISTEN ON SELECTED PORTS

// ROOT
app.get('/', function (req, res) {
  res.send('Hello Dex!');
});

// FACEBOOK Webhook handling
app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === validation_token) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

// **** START!
// Enable bot to listen on http and https
http.createServer(app).listen(80);
https.createServer(app).listen(443)