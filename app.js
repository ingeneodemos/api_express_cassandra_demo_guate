if(process.argv.length>=3 && (process.argv[2]=="production" || process.argv[2]=="testing")){
  global.config = require("./config/"+process.argv[2]);
}else{
  global.config = require("./config/development");
}

var express = require('express');
var app = express();
const cassandra = require('cassandra-driver');
var bodyParser = require('body-parser');
app.use(bodyParser.json());


global.msg = require("./config/common/msg");
global.resources = require("./config/common/resources");
global.queries = require("./config/common/queries");
global.log=require("./helpers/log");
global.utils=require("./helpers/utils");

const puerto = process.env.PORT || config.apiPort;
const authProvider = new cassandra.auth.PlainTextAuthProvider(config.cassandraUser, config.cassandraPass);
global.cli = new cassandra.Client({ contactPoints: config.cassandraUrls, queryOptions: { consistency: cassandra.types.consistencies.one }, authProvider: authProvider });



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", config.allowHttpMethods);
  next();
});


if(config.logRequests){
  app.use(function(req, res, next){
      log.info(req.method + " "+ req.url);     
      next()
  });
}

app.set('port', puerto);
app.use(global.utils.getUrlApi(global.resources.agent), require("./api/agent"));

app.use(function(req, res){
    res.status(404);
    res.send(global.utils.error(global.msg.resource_not_found));
});

global.cli.connect(function(err){
    if(err){
        log.error("Error al conectarse con la base de datos");
        log.error(err);
    } else {
        log.info("Conexión a cassandra correcta ");
    }
})

var server = app.listen(config.apiPort, config.host, config.backlog, function(){
    var host = server.address().address;
    var port = server.address().port;
    log.info("Servidor corriendo en : "+host+":"+port);
});