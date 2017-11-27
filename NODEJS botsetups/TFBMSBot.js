// MSBot
var restify = require('restify');
var builder = require('botbuilder');
// Setup Restify Server
var builder = require('../../core/');
// facebook messenger login
const fs = require("fs");
const login = require("facebook-chat-api");
//snapchat login

// utility funcs
var waitUntil = require('wait-until');
var uuidv1 = require('uuid/v1');
// pushbullet
var PushBullet = require('pushbullet');
var pusher = new PushBullet('o.ilRCllIpKhxOMsNscbySEyv9GXzAzYNg');
var oldM9iden = "ufiSLkUsjAaL5PFydU";
var m9Viden = "ufiSLkUsjAncMCuELY";
var tcerSSiden = "ufiSLkUsjAq9WLSuVE";
var firefoxiden = "ufiSLkUsjz1NhW0p52";
// vars	
var typin = 0;
var haveSeen =0;
var eventObject;
var FB_EMAIL = "trendy@three.com.au";
var FB_PASSWORD = "Joker999";


login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);
    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
	// set options
	api.setOptions({listenEvents: true, updatePresence: true});
	

// Create bot and default message handler
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector, function(session) {
    session.send("You said: '%s'. Try asking for 'help' or say 'goodbye' to quit", session.message.text);
});

// PROVIDING GENERAL HELP FOR A COMMAND LIKE HELP:
bot.dialog('help', function(session, args, next) {
        //Send a help message
        session.endDialog("Global help menu.");
    })
    // Once triggered, will start a new dialog as specified BY 'onSelectAction' option.
    .triggerAction({
        matches: /^help$/i,
        onSelectAction: (session, args, next) => {
            // Add the help dialog to the top of the dialog stack  (override the default behavior of replacing the stack)
            session.beginDialog(args.action, args)
        }
    });
//define a default dialog box when instantiating the UniversalBot class...
// ADDS REGEX RECOGNITION TO THE BOT (uk and ja)
bot.recognizer(new builder.RegExpRecognizer("CancelIntent", { en_us: /^(cancel|nevermind)/i, ja_jp: /^(キャンセル)/ }));



	// listen for new messages
api.listen((err, event) => {
	//if(err) { return console.error(err);
	if(event){ 
    eventObject = event;
	switch(eventObject.type) {
	case "message":
	console.log('MESSAGE DETECTED: ' + eventObject.body + " by "+ eventObject.author);




	var context = eventObject.body;	//setTimeout(ireadIt, 2000);
	



	bot.recognizer({
    
	
	
	
	
	recognize: function(context, done) {
        
		
		var intent = { score: 0.0 };
        
		
		if (context.message.text) {
            switch (context.message.text.toLowerCase()) {
                case 'help':
                    intent = { score: 1.0, intent: 'Help' };
                    break;
                case 'goodbye':
                    intent = { score: 1.0, intent: 'Goodbye' };
                    break;
                case 'yes':
                    intent = { score: 1.0, intent: 'Yes' };
                    break;
				  }
        }
        done(null, intent);
    }
});	
	console.log('MS resp : ' + intent);
	api.sendMessage(context, eventObject.threadID);
				}
		request.end();
	});
	break;	
		
	case "event":
		console.log('event detecTED:' + eventObject.body + event.author);
            //   console.log(event);
	//		 console.log('in chat: ' + event.threadID + 'user : ' + event.author + 'did: ' + event.body);
			 break;
			
		case "typ":
          console.log(event);
		 var convoUser = new String(event.from);
			api.getUserInfo(convoUser, (err, ret) => {
		
		
		
		
		}		 
});
	    break;	
			
		case "presence":
		api.getUserInfo([event.userID], (err, ret) => {
        console.log('stateChange: ' + ret.name + 'is now ' + event.statuses);
		});
		 break;
	
		case "read_receipt":
		api.getUserInfo(event.reader,(err, ret) => {
  var bot = new builder.UniversalBot(connector, [
    //...Default dialog waterfall steps...
    bot.dialog('greetings', [
        function(session) {
            builder.Prompts.text(session, "Hi handsome! How's your week going?");
        },

        function(session, results) {
            session.endDialog('Well, things could be worse than %s!', results.response);
        }
    ])
])
 console.log('in chat: ' + event.threadID + '; ' +' user has read message: ' + event.reader);
});
   break;
}






























//MULTI STRAIN WATERFALLS TO MAKE SURE USER PROFILE IS UP TO DATE:
// This bot ensures user's profile is up to date.
var bot = new builder.UniversalBot(connector, [
    function(session) {
        session.beginDialog('ensureProfile', session.userData.profile);
    },
    function(session, results) {
        session.userData.profile = results.response; // Save user profile.
        session.send('Hello %(name)s! I love %(company)s!', session.userData.profile);
    }
]);
bot.dialog('ensureProfile', [
    function(session, args, next) {
        session.dialogData.profile = args || {}; // Set the profile or create the object.
        if (!session.dialogData.profile.name) {
            builder.Prompts.text(session, "What's your name?");
        } else {
            next(); // Skip if we already have this info.
        }
    },
    function(session, results, next) {
        if (results.response) {
            // Save user's name if we asked for it.
            session.dialogData.profile.name = results.response;
        }
        if (!session.dialogData.profile.company) {
            builder.Prompts.text(session, "What company do you work for?");
        } else {
            next(); // Skip if we already have this info.
        }
    },
    function(session, results) {
        if (results.response) {
            // Save company name if we asked for it.
            session.dialogData.profile.company = results.response;
        }
        session.endDialogWithResult({ response: session.dialogData.profile });
    }
]);


// DINNER RESERVATION WATERFALL

// This is a dinner reservation bot that uses a waterfall technique to prompt users for input.
var bot = new builder.UniversalBot(connector, [
    function(session) {
        session.send("What .");
        builder.Prompts.time(session, "Please provide a reservation date and time (e.g.: June 6th at 5pm)");
    },
    function(session, results) {
        session.dialogData.reservationDate = builder.EntityRecognizer.resolveTime([results.response]);
        builder.Prompts.text(session, "How many people are in your party?");
    },
    function(session, results) {
        session.dialogData.partySize = results.response;
        builder.Prompts.text(session, "Who's name will this reservation be under?");
    },
    function(session, results) {
        session.dialogData.reservationName = results.response;

        // Process request and display reservation details
        session.send("Reservation confirmed. Reservation details: <br/>Date/Time: %s <br/>Party size: %s <br/>Reservation name: %s",
            session.dialogData.reservationDate, session.dialogData.partySize, session.dialogData.reservationName);
        session.endDialog();
    }
]);

