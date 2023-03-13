const express = require("express");
// const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");
// const xouter = require("./routers/");
const path = require('path')

const app = express();
app.listen(8080)

app.use('/', express.static(path.join(__dirname, 'dist/fyp')))

app.use(express.json());
app.use(urlencoded({extended:true}));

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

