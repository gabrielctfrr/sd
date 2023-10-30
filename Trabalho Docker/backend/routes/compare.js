const express = require("express");
const Alimento = require("../models/Alimentos");
const Bebida = require("../models/Bebidas");

const router = express.Router();

router.get("/:title", async (req, res) => {
  const {title} = req.params;
  const alimento = await Alimento.findOne({title: title});
  const bebida = await Bebida.findOne({title: title});

  res.send({
    alimento,
    bebida
  });
});


module.exports = router;