const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  temperatura: Number,
  humedad: Number,
  estado: String,
  deteccion: String,
  fecha: { type: Date, default: Date.now },
});

const Historial = mongoose.model("historial", sensorSchema);
const Sensor = mongoose.model("sensor", sensorSchema);

module.exports = { Historial, Sensor };
