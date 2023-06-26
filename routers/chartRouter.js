// Dependencies
const db = require('../databaseUtil')
const express = require('express');
let router = express.Router();

// DB logics
router.post('/postTest', (req, res) => {
    let newLocation = req.body

    let sql = "INSERT INTO testLocation SET ?"
    db.query(sql, newLocation, function (err, result) {
        if (err) throw err;
        console.log(result);

        res.json(result);
    });
})

router.get('/getTest', (req, res) => {
    let sql = "SELECT * FROM testLocation";
    
    db.query(sql, (err, result) => {
        res.json(result);
    })
})
    
module.exports = router;
