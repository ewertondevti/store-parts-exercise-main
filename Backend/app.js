const express = require("express");
const routes = require("../src/routes/parts");

const app = express();

app.use("/store", routes);

module.exports = app;
