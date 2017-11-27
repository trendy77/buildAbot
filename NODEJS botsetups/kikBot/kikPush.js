#!/usr/bin/env nodejs

var PushBullet = require('pushbullet');
var pusher = new PushBullet('o.ilRCllIpKhxOMsNscbySEyv9GXzAzYNg');
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(8080, 'localhost');

console.log('Server running at http://localhost:8080/');
var stream = pusher.stream();

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
		
		function createStream(){
			if (!streaming){
			var pushStream = stream.connect();
			}else{
stream.on('connect', function() {
				streaming = true;
			//	sendSMS('stream connected');
			console.log('push stream listening...');
			});
					
			stream.on('push', function(push) {
				if (push.application_name === 'Kik'){
			
				console.log( push);
			
				console.log( push.body );
				var request = app.textRequest(push.body, {
				sessionId: '<unique session id>'
				});
			});
			}		
		}
		createStream();

	}
			