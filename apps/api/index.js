import express from 'express';
import { openDb, initDb } from './db.js';

const app = express();
app.use(express.json());

// Iniciar banco de dados
initDb();

// Rota para listar usuários
app.get('/users', async (req, res) => {
  const db = openDb();
  
  // Usar prepare() e .all() para listar os usuários
  const stmt = db.prepare('SELECT * FROM users');
  const users = stmt.all(); // Usando `.all()` de `better-sqlite3`
  
  res.json(users);
});

// Rota para criar usuário
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const db = openDb();

  try {
    const result = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    result.run(name, email); // Usando `.run()` para executar o insert
    res.status(201).json({ name, email });
  } catch (error) {
    res.status(400).json({ error: 'Email já existe' });
  }
});

// Rodar servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ API rodando em http://localhost:${PORT}`);
});
