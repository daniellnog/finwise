import express from 'express';
import bcrypt from 'bcrypt';
import { openDb, initDb } from './db.js';

const app = express();
app.use(express.json());

// Iniciar banco de dados
initDb();

// Rota para listar usuários
app.get('/users', async (req, res) => {
  const db = openDb();
  
  // Usar prepare() e .all() para listar os usuários
  const stmt = db.prepare('SELECT u.name, u.email, u.created_at, u.username FROM users u');
  const users = stmt.all(); // Usando `.all()` de `better-sqlite3`
  
  res.json(users);
});

// Rota para criar usuário
app.post('/users', async (req, res) => {
  const { name, email, username, password } = req.body;
  const db = openDb();

  try {
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Senha inválida' });
    }
    // Gerar um hash seguro da senha (salt + hash)
    const saltRounds = 10; // Quanto maior, mais seguro, mas mais lento
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = db.prepare(`
      INSERT INTO users (name, email, username, password, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `);
    result.run(name, email, username, hashedPassword); // Armazena a senha criptografada

    res.status(201).json({ name, email, username });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Email já existe' });
  }
});

// Rodar servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ API rodando em http://localhost:${PORT}`);
});
