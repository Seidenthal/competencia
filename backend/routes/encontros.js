const express = require('express');
const router = express.Router();
const Aluna = require('../models/Aluna');
const Encontro = require('../models/Encontros');

// Rota para buscar todos os encontros de uma tutora
router.get('/:tutoraId', async (req, res) => {
  try {
    const encontros = await Encontro.findAll({
      where: { tutoraId: req.params.tutoraId },
    });
    res.json(encontros);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar encontros' });
  }
});

// Rota para adicionar um novo encontro
router.post('/add', async (req, res) => {
  try {
    const { date, time, topic, tutoraId } = req.body;
    const newEncontro = await Encontro.create({ date, time, topic, tutoraId });
    res.json(newEncontro);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar encontro' });
  }
});

// Rota para deletar um encontro pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const encontro = await Encontro.findByPk(req.params.id);
    if (encontro) {
      await encontro.destroy();
      res.json({ message: 'Encontro deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Encontro não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar encontro' });
  }
});

// Rota para buscar os encontros da aluna
router.get('/aluna/:alunaId', async (req, res) => {
  try {
    // Busca a aluna pelo ID
    const aluna = await Aluna.findByPk(req.params.alunaId);

    if (!aluna) {
      return res.status(404).json({ error: 'Aluna não encontrada' });
    }

    // Busca os encontros da tutora vinculada à aluna
    const encontros = await Encontro.findAll({
      where: { tutoraId: aluna.tutoraId },
    });

    res.json(encontros);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar encontros' });
  }
});

module.exports = router;
