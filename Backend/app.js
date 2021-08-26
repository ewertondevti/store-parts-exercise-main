const express = require("express");
const routes = require("./routes/parts");

const app = express();

app.use("/store", routes);

module.exports = app;
