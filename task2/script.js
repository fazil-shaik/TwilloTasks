const twilio = require('twilio');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config();
const accountSid = process.env.ID;  
const authToken = process.env.TOKEN;    
const client = new twilio(accountSid, authToken);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ivr-call', (req, res) => {
    const twiml = new twilio.twiml.VoiceResponse();

    const gather = twiml.gather({
        input: 'dtmf',
        numDigits: 1,
        action: '/ivr-response',  
        method: 'POST'
    });
    gather.say('Press 1 to receive your interview link.');

    twiml.redirect('/ivr-call');

    res.type('text/xml');
    res.send(twiml.toString());
});

app.post('/ivr-response', (req, res) => {
    const twiml = new twilio.twiml.VoiceResponse();

    if (req.body.Digits === '1') {
        twiml.say('Thank you! Sending your interview link now.');
        twiml.hangup();

        client.messages
            .create({
                body: 'Here is your personalized interview link: https://your-interview-link.com',
                from: '+18563734343', 
                to: '+918639002726'  
            })
            .then(message => console.log(`Interview link sent: ${message.sid}`))
            .catch(error => console.error('Error sending interview link:', error));
    } else {
        twiml.say('You pressed the wrong number.');
        twiml.hangup();
    }

    res.type('text/xml');
    res.send(twiml.toString());
});

// Start the server
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

client.calls
    .create({
        url: 'https://70f6-2409-40f0-112-4c49-29f0-86a3-783d-6be8.ngrok-free.app/ivr-call', // This should be your ngrok URL
        to: '+918639002726', 
        from: '+18563734343',    
    })
    .then((call) => console.log(`Call initiated: ${call.sid}`))
    .catch((error) => console.error('Error initiating call:', error));