const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const { SerialPort } = require('serialport');
const port = new SerialPort({ path: 'COM3', baudRate: 9600 }); // Replace 'COM3' with your actual port
const parser = port.pipe(new Readline({ delimiter: '\n' }));

parser.on('data', (data) => {
  const acceleration = parseFloat(data.trim());
  console.log(`Acceleration: ${acceleration} m/s²`);
  io.emit('acceleration', acceleration); // Send acceleration to React app
});

app.get('/', (req, res) => res.send('Server is running'));

server.listen(3001, () => console.log('Server listening on port 3001'));
