const db = require('./connection');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    daily_goal_calories INTEGER DEFAULT 2000,
    daily_goal_protein INTEGER DEFAULT 150,
    daily_goal_fat INTEGER DEFAULT 65,
    daily_goal_carbs INTEGER DEFAULT 250,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS food_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    meal_type TEXT NOT NULL CHECK(meal_type IN ('breakfast','lunch','dinner','snacks')),
    food_name TEXT NOT NULL,
    brand TEXT,
    serving_size TEXT,
    serving_size_g REAL,
    quantity REAL DEFAULT 1,
    calories REAL DEFAULT 0,
    protein REAL DEFAULT 0,
    fat REAL DEFAULT 0,
    saturated_fat REAL DEFAULT 0,
    carbs REAL DEFAULT 0,
    sugar REAL DEFAULT 0,
    fiber REAL DEFAULT 0,
    sodium REAL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_food_logs_user_date ON food_logs(user_id, date);
  CREATE INDEX IF NOT EXISTS idx_food_logs_user_date_meal ON food_logs(user_id, date, meal_type);
`);

module.exports = db;
