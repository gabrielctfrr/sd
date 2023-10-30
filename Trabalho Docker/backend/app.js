const express = require("express");
const cors = require("cors");
const homeRoutes = require("./routes/index");
const alimentoRoutes = require("./routes/alimentos");
const bebidaRoutes = require("./routes/bebidas");
const compareRoutes = require("./routes/compare");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/", homeRoutes);
app.use("/api/alimentos", alimentoRoutes);
app.use("/api/bebidas", bebidaRoutes);
app.use("/api/compare", compareRoutes);

module.exports = app;
