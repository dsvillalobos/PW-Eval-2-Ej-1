const express = require("express");
const cors = require("cors");

// Importando las rutas
import randNumberRoutes from "./routes/randNumberRoutes.js";

// Inicializar la app con express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta Inicial
app.get("/", function (req, res) {
  res.send("RESTful Web Service de NumbGuessr");
});

// Inicializar el RESTful Web Service
app.listen(6000, function () {
  console.log("Servidor inicializado en el puerto 6000");
});
