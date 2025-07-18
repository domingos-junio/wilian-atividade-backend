const express = require('express');
const cors = require('cors');
const db = require('./db'); // importa conexão
const app = express();
const port = 3000;

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length'],
  credentials: false,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API conectada ao MySQL! Acesse /usuarios');
});

// GET todos usuários
app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (err) {
    res.status(500).send('Erro ao buscar usuários');
  }
});

// GET por ID
app.get('/usuarios/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).send('Usuário não encontrado');
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send('Erro ao buscar usuário');
  }
});

// POST novo usuário
app.post('/usuarios', async (req, res) => {
  try {
    const { nome } = req.body;
    const [result] = await db.query('INSERT INTO usuarios (nome) VALUES (?)', [nome]);
    res.status(201).json({ id: result.insertId, nome });
  } catch (err) {
    res.status(500).send('Erro ao adicionar usuário');
  }
});

// PUT atualizar
app.put('/usuarios/:id', async (req, res) => {
  try {
    const { nome } = req.body;
    const [result] = await db.query('UPDATE usuarios SET nome = ? WHERE id = ?', [nome, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).send('Usuário não encontrado');
    res.json({ id: req.params.id, nome });
  } catch (err) {
    res.status(500).send('Erro ao atualizar usuário');
  }
});

// DELETE
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).send('Usuário não encontrado');
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Erro ao deletar usuário');
  }
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
