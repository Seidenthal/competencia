const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Tutora = require('../models/Tutora');
const Aluna = require('../models/Aluna');

// Login do Admin
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const admin = await Admin.findOne({ where: { email, senha } });
    if (admin) {
      res.json({ message: 'Login successful', admin });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ver todas as tutoras
router.get('/tutoras', async (req, res) => {
  try {
    const tutoras = await Tutora.findAll();
    res.json(tutoras);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ver todas as alunas
router.get('/alunas', async (req, res) => {
  try {
    const alunas = await Aluna.findAll();
    res.json(alunas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ver pedidos de cadastro
router.get('/aprovacoes', async (req, res) => {
  try {
    const tutoras = await Tutora.findAll({ where: { aprovado: false } });
    const alunas = await Aluna.findAll({ where: { aprovado: false } });
    res.json({ tutoras, alunas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Aprovar cadastro de tutora
router.post('/aprovar-tutora/:id', async (req, res) => {
  try {
    const tutora = await Tutora.findByPk(req.params.id);
    if (tutora) {
      tutora.aprovado = true;
      await tutora.save();
      res.json({ message: 'Tutora aprovada', tutora });
    } else {
      res.status(404).json({ message: 'Tutora não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Negar cadastro de tutora
router.post('/negar-tutora/:id', async (req, res) => {
  try {
    const tutora = await Tutora.findByPk(req.params.id);
    if (tutora) {
      await tutora.destroy();
      res.json({ message: 'Tutora negada e removida' });
    } else {
      res.status(404).json({ message: 'Tutora não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Aprovar cadastro de aluna
router.post('/aprovar-aluna/:id', async (req, res) => {
  try {
    const aluna = await Aluna.findByPk(req.params.id);
    if (aluna) {
      aluna.aprovado = true;
      await aluna.save();
      res.json({ message: 'Aluna aprovada', aluna });
    } else {
      res.status(404).json({ message: 'Aluna não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Negar cadastro de aluna
router.post('/negar-aluna/:id', async (req, res) => {
  try {
    const aluna = await Aluna.findByPk(req.params.id);
    if (aluna) {
      await aluna.destroy();
      res.json({ message: 'Aluna negada e removida' });
    } else {
      res.status(404).json({ message: 'Aluna não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;