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
  res.json({ message: 'world' });
});

// Conetando com o BD
const MongoClient = require('mongodb').MongoClient;


// Autenticação
const user = encodeURIComponent('root');
const password = encodeURIComponent('demolabbs');
const authMechanism = 'DEFAULT';

// Connection URL
const url = `mongodb://${user}:${password}@mongo:27017/?useNewUrlPaser=true?authMechanism=${authMechanism}`;


// Database Name
const dbName = 'onboard';
const colName = 'exercicio1';
const chaveBusca = { chave: "info" };

// //debugando conexão
// console.log("Instanciando MongoClient");
// console.log(url);
// var MongoClient = require('mongodb').MongoClient;
//  MongoClient.connect(url, function(err, db) {
//    if(!err) {
//      console.log("We are connected!!!");
//    }
//    db.close();
//  });

// Respondendo info com query em mongo
app.get('/info', (req, res) => {

  MongoClient.connect(url, function (err, db) {
    if (!err) {
      // console.log("Recuperando chave do exercicio 1");
      const dbcli = db.db(dbName);
      const colecao = dbcli.collection(colName);
      colecao.findOne( chaveBusca , function (err, item) {
        res.json(item);
        // console.log(item);
      });
      db.close();
    }
  });
});



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);



