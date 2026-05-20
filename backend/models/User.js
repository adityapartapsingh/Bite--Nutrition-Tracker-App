const db = require('../database/connection');

const User = {
  findById(id) {
    return db.prepare(
      'SELECT id, username, email, daily_goal_calories, daily_goal_protein, daily_goal_fat, daily_goal_carbs FROM users WHERE id = ?'
    ).get(id);
  },

  findByEmail(email) {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  },

  findByUsernameOrEmail(username, email) {
    return db.prepare('SELECT id FROM users WHERE username = ? OR email = ?').get(username, email);
  },

  create(username, email, passwordHash) {
    return db.prepare(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)'
    ).run(username, email, passwordHash);
  },

  updateGoals(id, { calories, protein, fat, carbs }) {
    return db.prepare(`
      UPDATE users SET
        daily_goal_calories = COALESCE(?, daily_goal_calories),
        daily_goal_protein  = COALESCE(?, daily_goal_protein),
        daily_goal_fat      = COALESCE(?, daily_goal_fat),
        daily_goal_carbs    = COALESCE(?, daily_goal_carbs),
        updated_at = datetime('now')
      WHERE id = ?
    `).run(calories, protein, fat, carbs, id);
  },

  /** Format a DB row into the API response shape. */
  toJSON(row) {
    if (!row) return null;
    return {
      id: row.id,
      username: row.username,
      email: row.email,
      dailyGoal: {
        calories: row.daily_goal_calories,
        protein: row.daily_goal_protein,
        fat: row.daily_goal_fat,
        carbs: row.daily_goal_carbs,
      },
    };
  },
};

module.exports = User;
