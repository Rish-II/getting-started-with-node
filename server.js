'use strict';

const express = require('express');
const path = require('path')
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World - NodeJS is running on FlashDrive!');
});

var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 40510})

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message)
  })

  setInterval(
    () => ws.send(`${new Date()}`),
    1000
  )
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
