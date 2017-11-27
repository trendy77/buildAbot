'use strict';

const __CONFIG__ = require('./config')
let util = require('util');
let http = require('http');
let Bot  = require('@kikinteractive/kik');

// Configure the bot API endpoint, details for your bot
const bot = new Bot({
  username: __CONFIG__.kik.botUsername,
  apiKey: __CONFIG__.kik.apiKey,
  baseUrl: __CONFIG__.kik.baseUrl
})
bot.updateBotConfiguration();

bot.onTextMessage((message, next) => {
    const userState = getUserState(message.from);
    if (!userState.inIntroState) {
        // Send the user the intro state
       

        return;
    }

    // Allow the next handler take over
    next();
});
bot.onTextMessage((message,next) => {
    searchFor(message.body)
        .then((result) => {
            message.reply(result);
        });
	
	next();
});
bot.onTextMessage((message) => {
    searchFor(message.body)
        .then((result) => {
            message.reply(result);
        });
});

// Set up your server and start listening
let server = http
    .createServer(bot.incoming())
    .listen(process.env.PORT || 8080);



// Add - added as contact dialog
bot.on('contactRelationUpdate', function (message) {
    if (message.action === 'add') {
        var name = message.user ? message.user.name : null;
        var reply = new builder.Message()
                .address(message.address)
                .text("Hi %s... Thanks for adding me x", name || 'there');
        bot.send(reply);
    }
});

// Add first run dialog
bot.dialog('firstRun', function (session) {    
    session.userData.firstRun = true;
    session.send("Hi cutie...").endDialog();
}).triggerAction({
    onFindAction: function (context, callback) {
        // Only trigger if we've never seen user before
        if (!context.userData.firstRun) {
            // Return a score of 1.1 to ensure the first run dialog wins
            callback(null, 1.1);
        } else {
            callback(null, 0.0);
        }
    }
});


// KIK - RUN npm 			
$username = "biancabityyy";
$api = "950ae81b-8594-48b2-94c4-5b36a2b5a123";
$auth = base64_encode($username:$api);

request.post({
    url: "https://api.kik.com/v1/config",
    auth: {
        user: "biancabityyy",
        pass: "950ae81b-8594-48b2-94c4-5b36a2b5a123"
    },
    json: {
        "webhook": "https://trendypublishincg.com.au/bot/kikBot2.js", 
        "features": {
            "receiveReadReceipts": true, 
            "receiveIsTyping": true, 
            "manuallySendReadReceipts": false, 
            "receiveDeliveryReceipts": false
        }
    }
}, callback);



// send a msg

request.post({
    url: "https://api.kik.com/v1/message",
    auth: {
        user: "<username>",
        pass: "<api_key>"
    },
    json: {
        "messages": [
            {
                "body": "bar", 
                "to": "laura", 
                "type": "text", 
                "chatId": "b3be3bc15dbe59931666c06290abd944aaa769bb2ecaaf859bfb65678880afab"
            }
        ]
    }
}, callback);

When a user sends your bot a message, your webhook will be called with a JSON payload with this structure:

{
    "messages": [
        {
            "chatId": "0ee6d46753bfa6ac2f089149959363f3f59ae62b10cba89cc426490ce38ea92d",
            "id": "0115efde-e54b-43d5-873a-5fef7adc69fd",
            "type": "text",
            "from": "laura",
            "participants": ["laura"],
            "body": "omg r u real?",
            "timestamp": 1439576628405,
            "readReceiptRequested": true,
            "mention": null,
            "metadata": null,
            "chatType": "direct",
        },
        {
            "chatId": "0ee6d46753bfa6ac2f089149959363f3f59ae62b10cba89cc426490ce38ea92d",
            "id": "74ded818-1eb7-4266-91bc-c301c2f41fe3",
            "type": "picture",
            "from": "aleem",
            "participants": ["aleem"],
            "picUrl": "http://example.kik.com/apicture.jpg",
            "timestamp": 1439576628405,
            "readReceiptRequested": true,
            "mention": null,
            "metadata": {
                "product": 1298373
            },
            "chatType": "direct"
        }
    ]
}

/// GET USER DETAILS
request.get({
    url: "https://api.kik.com/v1/user/laura",
    auth: {
        user: "<username>",
        pass: "<api_key>"
    }
}, callback);