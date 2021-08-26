const express = require("express");
const router = express.Router();
const queryContent = require("../../Backend/utils/query-content");
const storeParts = require("../../Backend/mock-data/parts");
const partsPerType = require("../../Backend/mock-data/parts-per-type");
const partTypes = require("../../Backend/mock-data/part-types");

router.get("/parts", (req, res) => {
  const params = { ...req.query };
  res.set("Access-Control-Allow-Origin", "*");
  const delay = Math.random() * 6 * 1000;
  let content = null;
  if (params.type) {
    setTimeout(() => {
      content = partsPerType[params.type.toLowerCase()];
      const response = queryContent(content, params.query);
      res.send(response || []);
    }, delay);
    return;
  }
  setTimeout(() => {
    content = storeParts;
    res.send(queryContent(content, params.query));
  }, delay);
});

router.get("/part-types", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send(partTypes);
});

router.get("/parts/:name", (req, res) => {
  const { name } = req.params;
  res.set("Access-Control-Allow-Origin", "*");
  res.send(storeParts.find((part) => part.name === name));
});

module.exports = router;
