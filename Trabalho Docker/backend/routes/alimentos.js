const express = require("express");
const validateId = require("../middleware/validateId");
const Alimentos = require("../models/Alimentos");

const router = express.Router();

router.get("/", async (req, res) => {
  const alimentos = await Alimentos.find().sort("title");
  res.send(alimentos);
});

router.get("/:id", validateId, async (req, res) => {
  const alimento = await Alimentos.findById(req.params.id);
  if (!alimento) return res.status(404).send();
  res.send(alimento);
});

router.post("/", async (req, res) => {
  if (!req.body.title) return res.status(400).send("O título é obrigatório.");

  const alimento = new Alimentos({ title: req.body.title });
  await alimento.save();
  res.status(201).send(alimento);
});

router.delete("/:id", async (req, res) => {
  const alimento = await Alimentos.findByIdAndDelete(req.params.id);

  if (!alimento)
    return res.status(404).send("O alimento com o ID informado não foi encontrado.");

  res.status(204).send();
});

module.exports = router;
