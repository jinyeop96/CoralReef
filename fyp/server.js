const express = require("express");
const { urlencoded } = require("body-parser");
const path = require('path')
// const mysql = require('mysql');
var debug = require('debug')('web:server');
var http = require('http');
const mysqlRouter = require('./web/login');
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




connection.connect( err => {
    if (err) {
        throw err;
    }

    console.log("connection done");
})

app.post('/test', (req, res) => {
    let newLocation = req.body

    let sql = "INSERT INTO testLocation SET ?"
    connection.query(sql, newLocation, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    // connection.query("INSERT INTO testLocation (location, state) values (`${location}`, `${state}`)", function (err, result, fields) {
    //     if (err) throw err;
    //     console.log(result);
    // });
    
})

// connection.query('insert into testing(name) values ("jinyeop")', (err, rows, fields) => {
//     if (err) throw err
  
//     console.log('The solution is: ', rows[0].solution)
// })
  

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
