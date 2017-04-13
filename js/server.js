/*jshint esversion: 6 */

const net = require('net');

// This "listens" for new Server Connections. The listeners/commands are for what happens to with ea new established client connection.
const server = net.createServer((connection)=> {
  console.log("New Server Connection Established");

  //I want the server to write to the client on their connection to write greeting, and ask client to designate a "username"
  // Store that username to variable
  // Use that variable before every input with write function.

    connection.on('data', (data) => {
      console.log(data.string());
      connection.write(data.string());

    });

    connection.on('end' (person)=>{
      connection.write(`${person} left has left the room`);

    });
});

// This initiates the Server
server.listen(3000,()=>{
  console.log ("Your chat session has opened. You're currently using port 3000");
});