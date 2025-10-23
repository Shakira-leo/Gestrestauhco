const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registro
router.post("/auth/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const nuevoUser = new User({ nombre, email, password });
    await nuevoUser.save();
    res.status(201).send("✅ Usuario registrado");
  } catch (error) {
    res.status(500).send("❌ Error al registrar usuario: " + error.message);
  }
});

// Login
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Usuario no encontrado");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Contraseña incorrecta");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { nombre: user.nombre, email: user.email } });
  } catch (error) {
    res.status(500).send("❌ Error al hacer login: " + error.message);
  }
});

module.exports = router;
