import express from "express";
import cors from "cors";

// Importando las rutas
import randNumberRoutes from "./routes/randNumberRoutes.js";

// Inicializar la app con express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/", randNumberRoutes);

// Ruta Inicial
app.get("/", function (req, res) {
  res.send("RESTful Web Service de NumbGuessr");
});

// Inicializar el RESTful Web Service
app.listen(3000, function () {
  console.log("Servidor inicializado en el puerto 3000");
});
