import Database from 'better-sqlite3';

export function openDb() {
  const db = new Database('./database.sqlite');
  return db;
}

export function initDb() {
  const db = openDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE
    );
  `);
}
