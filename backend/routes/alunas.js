const express = require('express');
const router = express.Router();
const Aluna = require('../models/Aluna');

// Cadastro de Aluna
router.post('/register', async (req, res) => {
  const { nome, telefone, cpf, ra, curso, email, senha } = req.body;
  try {
    const aluna = await Aluna.create({ nome, telefone, cpf, ra, curso, email, senha });
    res.json(aluna);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login de Aluna
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const aluna = await Aluna.findOne({ where: { email, senha, aprovado: true } });
    if (aluna) {
      res.json({ message: 'Login successful', aluna });
    } else {
      res.status(401).json({ message: 'Invalid credentials or not approved' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;