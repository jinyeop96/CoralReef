const express = require("express");
// const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");
// const xouter = require("./routers/");
const path = require('path')
const app = express();
//allow cross-domain
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use('/', express.static(path.join(__dirname, 'dist/fyp')))

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use("/login",mysqlRouter);

// const url = "mongodb://localhost:27017/theatre";
// mongoose.connect(url, function(err, result){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("successful");
//     }
// });


// app.get("/", router.);
// app.get("/test", router);


/**
 * Module dependencies.
 */

/**
 * Get port from environment and store in Express.
 */



/**
 * Listen on provided port, on all network interfaces.
 */
var port = normalizePort("8080");
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

