// index.js (main limpio)
// API mínima con Express para la demo DevSecOps

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Endpoint raíz
app.get("/", (req, res) => {
  res.json({
    message: "DevSecOps demo - main branch limpia ✅",
  });
});

// Endpoint de healthcheck
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
