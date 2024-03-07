const express = require("express");
const router = express.Router();

const {localFileUpload} = require("../contollers/fileUpload");

//api rout 
router.post("/localFileUpload",localFileUpload);



module.exports = router;