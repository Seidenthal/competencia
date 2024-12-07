const express = require('express');
const router = express.Router();
const Tutora = require('../models/Tutora');

// Cadastro de Tutora
router.post('/register', async (req, res) => {
  const { nome, telefone, cpf, email, senha } = req.body;
  try {
    const tutora = await Tutora.create({ nome, telefone, cpf, email, senha });
    res.json(tutora);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;