const mysql = require('mysql');

// Database connection
const connection = mysql.createConnection({
    host     : '127.0.0.1',     // local host for before deploying
    user     : 'root',  
    password : '12345',         // For developin in own device, set the MySql root password to 12345, for avoid confusion 
    database : 'test',          // database name
    port: 3306
});


connection.connect( err => {
    if (err) {
        throw err;
    }

    console.log("connection done");
})

module.exports = connection

////adjwd