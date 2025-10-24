// model/sensor.js
const mongoose = require("mongoose");

// 🕒 Función para obtener la hora actual de Perú (UTC-5)
function horaPeruana() {
  const ahora = new Date();
  const utc = ahora.getTime() + ahora.getTimezoneOffset() * 60000;
  const lima = new Date(utc - 5 * 60 * 60000); // Ajuste a hora peruana
  return lima;
}

// 🧠 Esquema de datos del sensor
const sensorSchema = new mongoose.Schema({
  temperatura: {
    type: Number,
    required: true,
  },
  humedad: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  deteccion: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: horaPeruana, // ⏰ Fecha actual de Perú
  },
});

// 📚 Modelos para el historial y el sensor actual
const Historial = mongoose.model("Historial", sensorSchema);
const Sensor = mongoose.model("Sensor", sensorSchema);

// 🚀 Exportar los modelos
module.exports = { Historial, Sensor };

// const mongoose = require("mongoose");

// //  Función para guardar la fecha/hora exacta de Perú
// function fechaHoraPeru() {
//   const ahora = new Date();
//   const offsetPeru = -5 * 60; // UTC-5 para Lima
//   const utc = ahora.getTime() + ahora.getTimezoneOffset() * 60000;
//   return new Date(utc + offsetPeru * 60000);
// }

// // Esquema del sensor actual
// const sensorSchema = new mongoose.Schema({
//   temperatura: { type: Number, required: true },
//   humedad: { type: Number, required: true },
//   estado: { type: String, required: true },
//   deteccion: { type: String, required: true },
//   fecha: { type: Date, default: fechaHoraPeru },
// });

// // Esquema del historial
// const historialSchema = new mongoose.Schema({
//   temperatura: { type: Number, required: true },
//   humedad: { type: Number, required: true },
//   estado: { type: String, required: true },
//   deteccion: { type: String, required: true },
//   fecha: { type: Date, default: fechaHoraPeru },
// });

// // 📦 Modelos
// const Sensor = mongoose.model("Sensor", sensorSchema);
// const Historial = mongoose.model("Historial", historialSchema);

// module.exports = { Sensor, Historial };

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
