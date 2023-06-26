// Dependencies
const db = require('../databaseUtil')
const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  console.log('organism called.');
    db.getByObj("organism", { genus: req.query.genus }).then(result => {
      res.json(result);
    });
});

router.get('/genus', (req, res) => {
  db.getAllCorals("organism").then(result => {
    const genus = result.map(item => item.genus).sort();
    res.json(genus);
  });
})

module.exports = router;
