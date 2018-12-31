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
  res.json ({message:'world'});
});

// Conetando com o BD
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Autenticação
const user = encodeURIComponent('root');
const password = encodeURIComponent('demolabbs');
const authMechanism = 'DEFAULT';

// Connection URL
const url = 'mongodb://localhost:27017';
//const url = `mongodb://${user}:${password}@localhost:27017/?authMechanism=${authMechanism}`;


// Database Name
const dbName = 'onboard';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  client.close();
});

// Respondendo info com query em mongo

app.get('/info', (req, res) => {

//  var MongoClient = require('mongodb').MongoClient;

  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const colecao = db.collection("exercicio1");
    colecao.findOne({chave:1},function(err,item){
    res.json(item);
    });
    client.close();
  });

  // Connect to the db
  // MongoClient.connect(url, function (err, db) {
  //   if (err) throw err;
  //   var dbo = db.db("onboard");    
  //   dbo.collection('exercicio1', function (err, collection) {  
  //       //  collection.find().toArray(function(err, items) {
  //       //     if(err) throw err;    
  //       //     console.log(items);            
  //     collection.findOne({chave:1},function(err,item){
  //       res.json(item);
  //       db.close;
  //     });
  //  });
          
});
                  


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);



