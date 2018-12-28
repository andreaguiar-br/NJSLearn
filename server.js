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


app.get('/info', (req, res) => {

  var MongoClient = require('mongodb').MongoClient;

  // Connect to the db
  MongoClient.connect("mongodb://localhost:27017/onboard", function (err, db) {
      
    db.collection('exercicio1', function (err, collection) {  
        //  collection.find().toArray(function(err, items) {
        //     if(err) throw err;    
        //     console.log(items);            
      collection.findOne({chave:1},function(err,item){
        res.json(item);
      });
    });
          
  });
                  
});



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


