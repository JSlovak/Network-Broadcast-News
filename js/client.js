/*jshint esversion: 6 */

const net = require('net');

const client = net.connect({port:3000, host:"10.0.1.3"}, ()=>{
  // client.write("Someone new has entered the chatroom.");

  process.stdin.on('data', (chunk) =>{
    // console.log(chunk.toString());
    client.write(chunk);
  });

  client.on('data', (data) => {
    console.log(data.toString());
  });

});