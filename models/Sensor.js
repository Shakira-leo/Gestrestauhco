const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  temperatura: Number,
  humedad: Number,
  estado: String,
  deteccion: String,
  fecha: { type: Date, default: Date.now },
});

const Historial = mongoose.model("Historial", sensorSchema);
const Sensor = mongoose.model("Sensor", sensorSchema);

module.exports = { Historial, Sensor };
