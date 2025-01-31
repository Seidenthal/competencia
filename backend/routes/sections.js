const express = require('express');
const multer = require('multer');
const router = express.Router();
const Section = require('../models/Section');

const upload = multer({ storage: multer.memoryStorage() });

// Adicionar uma nova seção
router.post('/add', upload.array('files'), async (req, res) => {
  const { title, description, deadline } = req.body;
  const files = req.files.map(file => ({
    name: file.originalname,
    type: file.mimetype,
    data: file.buffer,
  }));
  try {
    const section = await Section.create({ title, description, deadline, files });
    res.json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar todas as seções
router.get('/', async (req, res) => {
  try {
    const sections = await Section.findAll();
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar uma seção
router.put('/update/:id', upload.array('files'), async (req, res) => {
  const { id } = req.params;
  const { title, description, deadline } = req.body;
  const files = req.files.map(file => ({
    name: file.originalname,
    type: file.mimetype,
    data: file.buffer,
  }));
  try {
    const section = await Section.findByPk(id);
    if (section) {
      section.title = title;
      section.description = description;
      section.deadline = deadline;
      section.files = files;
      await section.save();
      res.json(section);
    } else {
      res.status(404).json({ message: 'Section not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Excluir uma seção
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const section = await Section.findByPk(id);
    if (section) {
      await section.destroy();
      res.json({ message: 'Section deleted' });
    } else {
      res.status(404).json({ message: 'Section not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;