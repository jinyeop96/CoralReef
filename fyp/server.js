const express = require("express");
// const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");
// const xouter = require("./routers/");
const path = require('path')
const mysql = require('mysql');

const app = express();
app.listen(8080)

app.use('/', express.static(path.join(__dirname, 'dist/fyp')))

app.use(express.json());
app.use(urlencoded({extended:true}));


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

