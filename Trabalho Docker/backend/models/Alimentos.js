const mongoose = require("mongoose")
const {alimentosDB} = require("../db1");

const Alimento = alimentosDB.model('Alimento', new mongoose.Schema({
  title: {
    type: String, 
    required: true
  }
}));

module.exports = Alimento; 