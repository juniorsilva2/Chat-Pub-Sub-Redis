# Chat-Pub-Sub-Redis

## Technologies:
* `Redis;`
* `Express;`
* `Dotenv;`
* `Nodemon;`
* `NodeJS`.

# Running the Project:

## Redis
To start the Redis container in docker run the file run.sh:

### Grant execute permission to the .sh file:
* `chmod +x run.sh`

### Finally to run the Redis Docker Container:
* `sudo ./run.sh`

### You can also Run it by using the following script:
* `sudo docker run -d -p 6379:6379 -i redis`


## Back-end
To run the code, go to the project's backend directory, and run the following commands:

### Install requisites:
* `npm i`

### Run it:
* `npm start`

### The application will be available through the following URL:
http://localhost:3000

### There's 2 ways to send a message on Chat:

## Using a Browser:
* `http://localhost:3000/enviarMensagem/:user/:message`
1. **user:** Name of the user sending the message.
2. **message**: Message that will be sent to the chat.

## Using JSON in an API Client with a POST Request:
* `http://localhost:3000/enviarMensagem`
* JSON: `{ "user":"John Doe", "message":"test message" }`
