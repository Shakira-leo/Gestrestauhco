const mongoose = require("mongoose");

// Función para obtener hora actual del Perú
function fechaHoraPeru() {
  const fechaLocal = new Date().toLocaleString("es-PE", { timeZone: "America/Lima" });
  return new Date(fechaLocal);
}

// Esquema del sensor actual
const sensorSchema = new mongoose.Schema({
  temperatura: Number,
  humedad: Number,
  estado: String,
  deteccion: String,
  fecha: { type: Date, default: fechaHoraPeru }, // ⏰ ahora con hora exacta del Perú
});

// Esquema del historial
const historialSchema = new mongoose.Schema({
  temperatura: Number,
  humedad: Number,
  estado: String,
  deteccion: String,
  fecha: { type: Date, default: fechaHoraPeru },
});

const Sensor = mongoose.model("Sensor", sensorSchema);
const Historial = mongoose.model("Historial", historialSchema);

module.exports = { Sensor, Historial };


// const mongoose = require("mongoose");

// const sensorSchema = new mongoose.Schema({
//   temperatura: Number,
//   humedad: Number,
//   estado: String,
//   deteccion: String,
//   fecha: { type: Date, default: Date.now },
// });

// const Historial = mongoose.model("Historial", sensorSchema);
// const Sensor = mongoose.model("Sensor", sensorSchema);

// module.exports = { Historial, Sensor };
