const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>API está em execução!</h1>");
});

module.exports = router;
