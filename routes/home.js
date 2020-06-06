const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("<h2>My Express App</h2>");
  }); 

module.exports = router;