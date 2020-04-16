const router = require('express').Router();
const verify = require('../verifyToken');

router.get("/",verify,(req,res) => {
    res.send("List Of Products");
})

module.exports = router;