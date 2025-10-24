const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Rutas
const sensoresRoutes = require("./routes/sensores");
const usuariosRoutes = require("./routes/usuarios");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Conexión a MongoDB Atlas
mongoose
  .connect("mongodb+srv://gestrestauhco:gestrestauhco25@gestrestauhco.eeqvk8a.mongodb.net/gestrestauhco?retryWrites=true&w=majority&appName=gestrestauhco")
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));

// Rutas
app.use("/api", sensoresRoutes);   // /api/datos, /api/historial, /api/sensor
app.use("/auth", usuariosRoutes);  // /auth/register, /auth/login

// Ruta raíz
app.get("/", (req, res) => res.send("🚀 Backend activo y en línea"));

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// // Rutas
// const sensoresRoutes = require("./routes/sensores");
// const usuariosRoutes = require("./routes/usuarios");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Conexión a MongoDB Atlas
// mongoose
//   .connect("mongodb+srv://gestrestauhco:gestrestauhco25@gestrestauhco.eeqvk8a.mongodb.net/gestrestauhco?retryWrites=true&w=majority&appName=gestrestauhco")
//   .then(() => console.log("✅ Conectado a MongoDB Atlas"))
//   .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));

// // Rutas
// app.use("/api", sensoresRoutes);   // /api/datos, /api/historial, /api/sensor
// app.use("/auth", usuariosRoutes);  // /auth/register, /auth/login

// // Ruta raíz
// app.get("/", (req, res) => res.send("🚀 Backend activo"));

// // Puerto
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
