// index.js (PR MALO)
// Introduce malas prácticas para que las herramientas de seguridad exploten.

const express = require("express");
const _ = require("lodash");
const config = require("./config");

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint raíz: muestra que es el PR MALO
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
