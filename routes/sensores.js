const express = require("express");
const router = express.Router();
const { Historial, Sensor } = require("../models/sensor");

// Guardar datos del sensor
router.post("/datos", async (req, res) => {
  try {
    const nuevoHistorial = new Historial(req.body);
    await nuevoHistorial.save();
    await Sensor.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    res.status(201).send("✅ Dato guardado correctamente");
  } catch (err) {

    
    res.status(500).send("❌ Error en el servidor");
  }
});

// Obtener historial completo
router.get("/historial", async (req, res) => {
  try {
    const datos = await Historial.find().sort({ fecha: -1 });
    res.json(datos);
  } catch (err) {
    res.status(500).send("❌ Error al obtener historial");
  }
});

// Obtener último dato
router.get("/sensor", async (req, res) => {
  try {
    const sensor = await Sensor.findOne();
    res.json(sensor || {});
  } catch (err) {
    res.status(500).send("❌ Error al obtener sensor actual");
  }
});

module.exports = router;
