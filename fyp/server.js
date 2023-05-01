// Dependencies
const express = require("express");
const { urlencoded } = require("body-parser");
const path = require('path')
var debug = require('debug')('web:server');
var http = require('http');

// ############# Router Declaration ############# 
// Define routes at the bottom
const loginRouter = require('./routers/loginRouter'); // David
const chartRouter = require('./routers/chartRouter'); // Jin
const coralsRouter = require('./routers/coralsRouter'); // Jin
const organismRouter = require('./routers/organismRouter'); // Oliver


// Configuration
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
app.use(urlencoded({ extended: true }));

// app.use('/js', express.static(__dirname + '/js'));
// app.use('/dist', express.static(__dirname + '/../dist'));
// app.use('/css', express.static(__dirname + '/css'));
// app.use('/partials', express.static(__dirname + '/partials'));


// Angular configures # in URL. This requires no configuration on server side.
// In order to have no # in the URL, set urlHash: false in app-routing.module.ts
// Then, as below, accept all request and simply render the index.html
//app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    //const filePath = path.join(__dirname, 'dist/fyp')
    //res.sendFile('index.html', { root: filePath });
//});


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




// ############# Define Routes here #########
app.use("/login", loginRouter); // David
app.use("/chart", chartRouter); // Jin
app.use("/corals", coralsRouter);
app.use("/organism", organismRouter);// Oliver