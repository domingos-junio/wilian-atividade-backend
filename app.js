const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// ✅ Configuração completa de CORS liberando tudo
const corsOptions = {
  origin: '*', // permite todas as origens
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // cabeçalhos permitidos
  exposedHeaders: ['Content-Length'], // cabeçalhos expostos ao navegador
  credentials: false, // não permite cookies/autenticação cruzada
};

app.use(cors(corsOptions)); // aplica CORS com essas opções
app.use(express.json());

let usuarios = [
  { id: 1, nome: 'João' },
  { id: 2, nome: 'Maria' }
];

app.get('/', (req, res) => {
  res.send('API funcionando! Acesse /usuarios para ver os usuários.');
});

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send('Usuário não encontrado');
  res.json(usuario);
});

app.post('/usuarios', (req, res) => {
  const novoUsuario = {
    id: usuarios.length + 1,
    nome: req.body.nome
  };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

app.put('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send('Usuário não encontrado');
  usuario.nome = req.body.nome;
  res.json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
  usuarios = usuarios.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
