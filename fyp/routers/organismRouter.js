// Dependencies
const db = require('../databaseUtil')
const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    db.getByObj("organism", { genus: req.query.genus }).then(result => {
      res.json(result);
    });
})

module.exports = router;
