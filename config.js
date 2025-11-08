// config.js (PR MALO)
// Esto es código deliberadamente malo para la demo.
// NO hacer esto en proyectos reales.

const config = {
  // Token falso con formato típico de GitHub para que Gitleaks lo marque
  githubToken: "ghp_1234567890abcdef1234567890abcdef1234",

  // Clave con patrón típico de AWS Access Key
  awsAccessKeyId: "AKIA1234567890FAKEACCESSKEY",
  awsSecretAccessKey: "SECRET1234567890FAKESECRETKEY",

  // Otro ejemplo de "secreto"
  dbPassword: "SuperSecreta123!"
};

module.exports = config;
