const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Registro
router.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) return res.status(400).send("Faltan datos");

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ nombre, email, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: "Usuario registrado" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send({ error: "Usuario no encontrado" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send({ error: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });
  res.send({ token, nombre: user.nombre });
});

module.exports = router;
