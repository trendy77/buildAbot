var PushBullet = require('pushbullet');
var pusher = new PushBullet('o.ilRCllIpKhxOMsNscbySEyv9GXzAzYNg');

var oldM9iden = "ufiSLkUsjAaL5PFydU";
var m9Viden = "ufiSLkUsjAncMCuELY";
var tcerSSiden = "ufiSLkUsjAq9WLSuVE";
var firefoxiden = "ufiSLkUsjz1NhW0p52";

var stream = pusher.stream();

function listDevices(){
	var options = {
    limit: 10
	};
	pusher.devices(options, function(error, response) {
	console.log(response);
	});
}

//function registerDevice(){
//	var deviceOptions = {
//    nickname: 'node-kikBot'
//	};
//pusher.createDevice(deviceOptions, function(error, response) {});
//}

// push to specific device...
//pusher.note(m9Viden, 'New Note', 'Note body text', function(error, response) {});

		function sendSMS(message){
			// push an SMS to send
			var options = {
				source_user_iden: "ufiSLkU",              // The user iden of the user sending this message
				target_device_iden: m9Viden, // The iden of the device corresponding to the phone that should send the SMS
				conversation_iden: '+61404095091',       // Phone number to send the SMS to
				message: message
			};
		pusher.sendSMS(options, function(error, response) {});
		}

			function createDevice()
			{
				var deviceOptions = {
					nickname: 'NodePush'
				};
				pusher.createDevice(deviceOptions, function(error, response) {});
				console.log('device NodePush Setup');
				console.log(response);
			}

			function createStream()
			{
				var pushStream = stream.connect();
				stream.on('connect', function() {
						sendSMS('stream connected');
						console.log('push stream listening...');
				});
					
				stream.on('message', function(message) {
			//		console.log( message.package_name);
			//		console.log( message.notification_tag); 
					
				});	
				
				stream.on('push', function(push) {
			//	console.log( push);
			if (push.application_name === 'Kik'){
				console.log( push.body );
			}
			//	if (push.package_name === "kik.android"){
			//		var msg = push.body;	
			//		pusher.sendSMS( msg );
			//		}
				});
			}
		
		// MAIN RUNNING LOOP....!

	//	registerDevice();

	//	listDevices();
		
		createStream();