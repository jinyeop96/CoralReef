const express = require("express");
const { urlencoded } = require("body-parser");
const path = require('path')

// Routers
const testRouter = require("./routers/testRouter")


const app = express();
app.listen(8080)

app.use('/', express.static(path.join(__dirname, 'dist/fyp')))
app.use(express.json());
app.use(urlencoded({extended:true}));

// RESTful APIs for MySql database
app.post('/postTest', testRouter.postTest)
app.get('/getTest', testRouter.getTest)


// app.post('/test', (req, res) => {
//     let newLocation = req.body

//     let sql = "INSERT INTO testLocation SET ?"
//     connection.query(sql, newLocation, function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//     });
    // connection.query("INSERT INTO testLocation (location, state) values (`${location}`, `${state}`)", function (err, result, fields) {
    //     if (err) throw err;
    //     console.log(result);
    // });
    
// })

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

