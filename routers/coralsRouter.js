let database=require("../databaseUtil")
let express = require('express');
let router = express.Router();

router.get('/getCorals', (req, res) => {

    database.getAllCorals("tb_corals", req.body)
    .then(result => {
      if(result){
       
        let dataContainer = {};
        result.map((item) => {
            dataContainer[item.state_province] = dataContainer[item.state_province] || [];
            dataContainer[item.state_province].push(item);
        });
         
        let listArr = [];
        let dataName = Object.keys(dataContainer);
        dataName.map((nameItem) => {
            listArr.push({ region_name: nameItem, data: dataContainer[nameItem] });
        });

        res.json({
            list: listArr
        });
      }
      
    })
    .catch(error => {
      res.status(500).json({error: error.message});
    });
})
    
module.exports = router;