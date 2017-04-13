/*jshint esversion: 6 */

const net = require('net');

const client = net.connect({port:3000}, ()=>{
  console.log("You've entered chatroom at PORT: 3000.");
  client.write("Someone new has entered the chatroom.");

  let username = null;

  process.stdin.on('data', (chunk) =>{
    // console.log(chunk.toString());
    client.write(chunk);
  });

  client.on('data', (data) => {
    console.log(data.toString());
  });

});