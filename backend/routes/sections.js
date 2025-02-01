const express = require('express');
const multer = require('multer');
const router = express.Router();
const Aluna = require('../models/Aluna');
const Section = require('../models/Section');

const upload = multer({ storage: multer.memoryStorage() });

// Adicionar uma nova seção
router.post('/add', upload.array('files'), async (req, res) => {
  try {
    // Extraindo dados do `FormData`
    const { title, description, deadline, tutoraId } = req.body;

    if (!title || !description || !tutoraId) {
      return res
        .status(400)
        .json({ error: 'Título, descrição e tutoraId são obrigatórios.' });
    }

    // Convertendo `tutoraId` para número (se necessário)
    const tutoraIdInt = parseInt(tutoraId, 10);
    if (isNaN(tutoraIdInt)) {
      return res.status(400).json({ error: 'tutoraId inválido.' });
    }

    // Processando arquivos (se houver)
    const files =
      req.files.length > 0
        ? req.files.map((file) => ({
            name: file.originalname,
            type: file.mimetype,
            data: file.buffer,
          }))
        : [];

    //  Criando a nova seção no banco de dados
    const section = await Section.create({
      title,
      description,
      deadline,
      files,
      tutoraId: tutoraIdInt,
    });

    res.status(201).json(section);
  } catch (err) {
    console.error('Erro ao adicionar seção:', err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

//  Buscar todas as seções de uma tutora
router.get('/:tutoraId', async (req, res) => {
  try {
    const { tutoraId } = req.params;

    //  Buscar somente as seções da tutora especificada
    const sections = await Section.findAll({ where: { tutoraId } });

    res.json(sections);
  } catch (err) {
    console.error('Erro ao buscar seções:', err);
    res.status(500).json({ error: 'Erro ao buscar seções.' });
  }
});

//  Atualizar uma seção
router.put('/update/:id', upload.array('files'), async (req, res) => {
  try {
    const { title, description, deadline, tutoraId } = req.body;
    const files = req.files ? req.files.map((file) => file.path) : []; // Caminhos dos arquivos enviados

    const section = await Section.findByPk(req.params.id);
    if (section) {
      // Atualiza os campos da seção
      section.title = title;
      section.description = description;
      section.deadline = deadline;
      section.files = files; // Atualiza os arquivos
      await section.save();

      res.json(section); // Retorna a seção atualizada
    } else {
      res.status(404).json({ error: 'Seção não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar seção' });
  }
});

//  Excluir uma seção
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const section = await Section.findByPk(id);
    if (!section) {
      return res.status(404).json({ error: 'Seção não encontrada.' });
    }

    await section.destroy();
    res.json({ message: 'Seção excluída com sucesso.' });
  } catch (err) {
    console.error('Erro ao excluir seção:', err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

//  Buscar seções da tutora vinculada à aluna
router.get('/aluna/:alunaId', async (req, res) => {
  try {
    const { alunaId } = req.params;

    //  Buscar a aluna para obter o `tutoraId`
    const aluna = await Aluna.findByPk(alunaId);
    if (!aluna || !aluna.tutoraId) {
      return res
        .status(404)
        .json({ error: 'Tutora não encontrada para esta aluna.' });
    }

    //  Buscar seções da tutora vinculada
    const sections = await Section.findAll({
      where: { tutoraId: aluna.tutoraId },
    });

    res.json(sections);
  } catch (err) {
    console.error('Erro ao buscar seções:', err);
    res.status(500).json({ error: 'Erro ao buscar seções.' });
  }
});

module.exports = router;
