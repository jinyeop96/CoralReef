const fs = require('fs')
const path = require('path')
const xlsx = require('node-xlsx');
const db = require('../databaseUtil')
const express = require('express');
let router = express.Router();

router.post('/postTest', (req, res) => {
    let newArray = []
    let addArray = [];
    let list = xlsx.parse(fs.readFileSync(path.resolve('src','upload/corals-data-modify.csv')));

    let obj = {};
    list[0].data.forEach((row) => {
        if (row[0] != undefined && row[1] != undefined && row[2] != undefined){
            obj[row.toString()]=row;
        }
    })
    for ( let key in obj) {
        newArray.push(obj[key]);
    };
    for (let i = 1; i < newArray.length; i++) {
        let tem_arr = {
            'state_province' : newArray[i][0],
            'scientific_name' : newArray[i][1],
            'family' : newArray[i][2],
        }
        addArray.push(tem_arr);
    }

    let sql = "INSERT INTO testLocation SET ?"
    db.query(sql, addArray, function (err, result) {
        if (err) throw err;
        console.log(result);

        res.json(result);
    });
})

module.exports = router;