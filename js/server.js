/*jshint esversion: 6 */

const net = require('net');

// Keeps track of users
let users = [];

// Defines the port
let port = 3000;

// Initiates a server
const server = net.createServer((connection)=> {

  // Let's admin know when a new user has connected
  console.log("A new-user has signed into the chatroom");

  //Prompts the user for a username
  connection.write("Welcome to chatroom at PORT 3000, please enter a username.");

  // Add new user to user array
  users.push(connection);
  connection.username = null;

  // Share message with user, if user is not myself
  connection.on('data', (data)=> {

    // traverse array of users
    for(let i= 0; i<users.length; i++){

      // Check to see if username has been set//
      if (connection.username === null){

        // If not, set username
        connection.username = data.toString();

        // Notify Admin that username has been set
        process.stdout.write( "This new User has set their username to " + connection.username);

        // Notify room that user has joined
        if (users[i] !== connection){
          users[i].write(connection.username.trim() + " joined the chatroom.");
        } else {

        // Feedback to user that their username has been set
          connection.write("You're username has been set to " + connection.username);
        }
      }

      else {
        // format Buffer to string data-type
        let message = data.toString();

        // UX, notify user if only one in chatroom
        if (users.length <= 1){
          connection.write("Currently, there is no one else in the chatroom.");
          process.stdout.write(connection.username.trim() + " : " + message);
        }


        // Broadcast to users that are not this one
        if (users[i] !== connection){
          users[i].write(connection.username.trim() + " : " + message);

          // Broadcast to Admin
          process.stdout.write(connection.username.trim() + " : " + message);
        }
      }
    }
  });
// Allow for Admin to broadcast with denotation '[ADMIN]:'
  process.stdin.on('data', (chunk) =>{
    connection.write(`[ADMIN]:${chunk}`);
  });
});

// This initiates the Server
server.listen(port,()=> {
  console.log (`You've opened a chat session. You're currently the Administrator. You're currently using port ${port}`);
});


