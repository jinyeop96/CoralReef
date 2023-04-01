const db = require('../database')

const { json } = require("express")

module.exports = {
    
    postTest(req, res) {
        let newLocation = req.body

        let sql = "INSERT INTO testLocation SET ?"
        db.query(sql, newLocation, function (err, result) {
            if (err) throw err;
            console.log(result);

            res.json(result);
        });
    },

    getTest(req, res) {
        let sql = "SELECT * FROM testLocation";

        db.query(sql, (err, result) => {
            res.json(result);
        })
    }

}