
    Visit https://dev.kik.com/#/home and follow their instructions for creating a bot
    Run npm install
    Install ngrok with npm install ngrok -g
    Run ngrok http 8080. This will forward your http://localhost:8080 to the ngrok address.
    Go into /config/index and enter in your Kik bot credentials. Also, for the value of the key baseUrl, enter the ngrok url you got from the last step.
    Run npm start
    Go into Kik and send a message to your bot and check your logs to see if you successfully received the message on your server. Try saying hello!
