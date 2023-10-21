
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const {createClient} = require('redis');

const publisher = createClient();
const subscriber = createClient();

publisher.on('connect', () => console.log('publisher conectado !'));
subscriber.on('connect', () => console.log('subscriber conectado !'));

publisher.connect();
subscriber.connect();

const chat = [];

subscriber.subscribe('chat', (message) => {

    if (!chat.includes(message)) {
        console.log(message);
    }

    chat.push(message);
});

app.get('/enviarMensagem/:user/:message', (req, res) => {    

    const hours = (new Date().getHours()).toString().padStart(2, '0');
    const minutes = (new Date().getMinutes()).toString().padStart(2, '0');
    const seconds = (new Date().getSeconds()).toString().padStart(2, '0');
    const {user, message} = req.params;
    
    publisher.publish('chat', `[${hours}:${minutes}:${seconds}] [${user}]: ${message}` );

    res.json({message: 'Mensagem enviada com sucesso !'});

});

app.post('/enviarMensagem', (req, res) => {    

    const hours = (new Date().getHours()).toString().padStart(2, '0');
    const minutes = (new Date().getMinutes()).toString().padStart(2, '0');
    const seconds = (new Date().getSeconds()).toString().padStart(2, '0');
    // const {user, message} = req.params;
    const {user, message} = req.body;

    publisher.publish('chat', `[${hours}:${minutes}:${seconds}] [${user}]: ${message}` );

    res.json({message: 'Mensagem enviada com sucesso !'});

});


app.listen(
    3000,
    () => console.log('Server is running on URL http://localhost:3000 !')
);