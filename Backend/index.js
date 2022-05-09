const express = require("express");

const app = express();
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Aprobanos ruso");
});
