const express = require("express");
const router = express.Router();
const { Historial, Sensor } = require("../models/Sensor");

// Guardar datos
router.post("/datos", async (req, res) => {
  try {
    const nuevoHistorial = new Historial(req.body);
    await nuevoHistorial.save();
    await Sensor.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    res.status(201).send("✅ Dato guardado correctamente");
  } catch (error) {
    res.status(500).send("❌ Error en el servidor");
  }
});

// Ver historial
router.get("/historial", async (req, res) => {
  try {
    const datos = await Historial.find().sort({ fecha: -1 });
    res.json(datos);
  } catch (error) {
    res.status(500).send("❌ Error al obtener historial");
  }
});

// Ver último sensor
router.get("/sensor", async (req, res) => {
  try {
    const sensor = await Sensor.findOne();
    res.json(sensor || {});
  } catch (error) {
    res.status(500).send("❌ Error al obtener sensor actual");
  }
});

module.exports = router;
