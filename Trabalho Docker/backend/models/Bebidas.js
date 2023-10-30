const mongoose = require('mongoose');
const {bebidasDB} = require("../db2");

const Bebidas = bebidasDB.model('Bebidas', new mongoose.Schema({
  title: {
    type: String, 
    required: true
  }
}));

module.exports = Bebidas; 