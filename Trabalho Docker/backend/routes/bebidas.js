const express = require("express");
const validateId = require("../middleware/validateId");
const Bebidas = require("../models/Bebidas");

const router = express.Router();

router.get("/", async (req, res) => {
  const bebidas = await Bebidas.find().sort("title");
  res.send(bebidas);
});

router.get("/:id", validateId, async (req, res) => {
  const bebidas = await Bebidas.findById(req.params.id);
  if (!bebidas) return res.status(404).send();
  res.send(bebidas);
});

router.post("/", async (req, res) => {
  if (!req.body.title) return res.status(400).send("O título é obrigatório.");

  const bebidas = new Bebidas({ title: req.body.title });
  await bebidas.save();
  res.status(201).send(bebidas);
});

router.delete("/:id", async (req, res) => {
  const bebidas = await Bebidas.findByIdAndDelete(req.params.id);

  if (!bebidas)
    return res.status(404).send("A bebida com o ID fornecido não foi encontrada.");

  res.status(204).send();
});

module.exports = router;
