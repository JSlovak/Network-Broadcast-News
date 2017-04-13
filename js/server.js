/*jshint esversion: 6 */

const net = require('net');
let users = [];


// This "listens" for new Server Connections. The listeners/commands are for what happens to with ea new established client connection.
const server = net.createServer((connection)=> {
  console.log("New Server Connection Established");
  let username = null;

  // Add new user to user array
  users.push(connection);

  // Share message with user, if user is not myself
  connection.on('data', (data)=> {
    for(let i= 0; i<users.length; i++){
      if (users[i] !== connection){
        users[i].write(data.toString());
      }
    }
  });

  process.stdin.on('data', (chunk) =>{
    connection.write(`[ADMIN]:${chunk}`);
  });
});

// This initiates the Server
server.listen(3000,()=>{
  console.log ("You've opened a chat session. You're currently the Administrator. You're currently using port 3000");
});