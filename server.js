'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

// Respondendo ao hello
app.get('/hello', (req, res) => {
  res.send('{message: \'World\'}\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

