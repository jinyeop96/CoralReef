let database=require("../databaseUtil")
let express = require('express');
let router = express.Router();

router.post("/login", (req, res, next) => {
  database.getByObj("tb_user", req.body)
    .then(result => {
      if(result){
        if(result.length>=1){
          res.json({message: "success"});
        }else{
          res.json({message: "error"});
        }
      }
      
    })
    .catch(error => {
      res.status(500).json({error: error.message});
    });
});

router.post("/register", (req, res, next) => {
  database.create("tb_user", req.body)
    .then(result => {
      console.log(result);
      if(result){
        if(result.affectedRows>=1){
          res.json({message: "success"});
        }else{
          res.json({message: "error"});
        }
      }
      
    })
    .catch(error => {
      res.status(500).json({error: error.message});
    });
});


module.exports = router;
