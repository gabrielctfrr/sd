const mongoose = require("mongoose");

const dbUrl = "mongodb://db-alimentos/volume1";

const alimentosDB =  mongoose.createConnection(dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
console.log("Conectado ao MongoDB-Alimentos: " + dbUrl);


const close = () => alimentosDB.close();

module.exports = { alimentosDB, close, url: dbUrl };
