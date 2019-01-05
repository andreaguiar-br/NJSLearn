'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  addMetricaInvocacao('/')
  res.send('Hello world\n');
});

// Respondendo ao hello
app.get('/hello', (req, res) => {
  addMetricaInvocacao('/hello');
  res.json({ message: 'world' });
});

// Conetando com o BD
const MongoClient = require('mongodb').MongoClient;
// Autenticação
// const user = encodeURIComponent('root');
// const password = encodeURIComponent('demolabbs');
const user = encodeURIComponent(process.env.MONGO_ROOT_USER);
const password = encodeURIComponent(process.env.MONGO_ROOT_PWD);
const authMechanism = 'DEFAULT';
// Connection URL
const url = `mongodb://${user}:${password}@mongo:27017/?useNewUrlPaser=true?authMechanism=${authMechanism}`;


// Database Name
const dbName = 'onboard';
const colName = 'exercicio1';
const chaveBusca = { chave: "info" };

// Variáveis para metricas
var qtInvocacao = 0;
var metricaInvocacao = [];
var endpoints = [];

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

function addMetricaInvocacao(endpoint) {
  qtInvocacao += 1;  //contagem total 
  var posEndpoint = endpoints.indexOf(endpoint);
  if (posEndpoint >= 0) {
    metricaInvocacao[posEndpoint] += 1
  } else {
    metricaInvocacao.push(1); //incrementa chamada do endpoint
    endpoints.push(endpoint); //adiciona endpoint
  }
}


// Respondendo info com query em mongo
app.get('/info', (req, res) => {

  addMetricaInvocacao('/info');
  MongoClient.connect(url, function (err, db) {
    if (!err) {
      const dbcli = db.db(dbName);
      const colecao = dbcli.collection(colName);
      colecao.findOne(chaveBusca, function (err, item) {
        res.json(item);
      });
      db.close();
    }
  });
});

// Retornando métricas da aplicação
app.get('/metrics', (req, res) => {

  addMetricaInvocacao('/metrics');

  res.set('Content-Type', 'text/plain');

  res.write('# HELP mynodeapp_uptime_seconds A counter of uptime of My Node APP\n');
  res.write('# TYPE mynodeapp_uptime_seconds counter\n');
  res.write('mynodeapp_uptime_seconds ' + Math.floor(process.uptime()) + '\n');

  res.write('# HELP mynodeapp_qt_invocacao A counter of how many times the app My Node APP was called\n');
  res.write('# TYPE mynodeapp_qt_invocacao counter\n');

  for (let index = 0; index < endpoints.length; index++) {
    res.write('mynodeapp_qt_invocacao { endpoint=\"' + endpoints[index] + '\"} ' + metricaInvocacao[index] + '\n');
  }
  res.write('mynodeapp_qt_invocacao_total ' + qtInvocacao + '\n');

  res.send();
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);



