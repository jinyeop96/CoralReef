// Dependencies
const express = require("express");
const path = require('path')

// ############# Router Declaration ############# 
// Define routes at the bottom
const loginRouter = require('./routers/loginRouter'); // David
const chartRouter = require('./routers/chartRouter'); // Jin
const coralsRouter = require('./routers/coralsRouter'); // Jin
const organismRouter = require('./routers/organismRouter'); // Oliver


// Configuration
const app = express();
app.listen(8080);
app.use('/', express.static(path.join(__dirname, 'dist/fyp')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/js', express.static(__dirname + '/js'));
// app.use('/dist', express.static(__dirname + '/../dist'));
// app.use('/css', express.static(__dirname + '/css'));
// app.use('/partials', express.static(__dirname + '/partials'));


// ############# Define Routes here #########
app.use("/login", loginRouter); // David
app.use("/chart", chartRouter); // Jin
app.use("/corals", coralsRouter);
app.use("/api/organism", organismRouter);// Oliver


// Angular configures # in URL. This requires no configuration on server side.
// In order to have no # in the URL, set urlHash: false in app-routing.module.ts
// Then, as below, accept all request and simply render the index.html
app.use('/', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    const filePath = path.join(__dirname, 'dist/fyp')
    res.sendFile('index.html', { root: filePath });
});