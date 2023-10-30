const mongoose = require("mongoose");

const dbUrl = "mongodb://db-bebidas/volume2";

const bebidasDB =  mongoose.createConnection(dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
console.log("Conectado ao MongoDB-Bebidas: " + dbUrl);


const close = () => bebidasDB.close();

module.exports = { bebidasDB, close, url: dbUrl };
