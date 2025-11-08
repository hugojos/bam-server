// index.js (main limpio)
// API mínima con Express, lista para levantar en cualquier lado.

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Endpoint raíz para probar que el server está vivo
app.get("/", (req, res) => {
  res.json({
    message: "DevSecOps demo - main branch limpia ✅",
  });
});

// Endpoint de healthcheck (útil si alguien la despliega)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
