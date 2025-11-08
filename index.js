const express = require("express");
const _ = require("lodash");
const config = require("./config");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "DevSecOps demo - PR MALO ❌",
    // Solo mostramos las keys para no leakear valores completos
    loadedConfigKeys: Object.keys(config),
    lodashVersion: _.VERSION
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
