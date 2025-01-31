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
// Login de Tutora
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const tutora = await Tutora.findOne({ where: {email, senha, aprovado: true} });
    if (tutora) {
      res.json({ id: tutora.id});
    } else {
      res.status(401).json({ message: 'Invalid credentials or not approved' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;