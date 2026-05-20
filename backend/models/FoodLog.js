const db = require('../database/connection');

const FoodLog = {
  getByDate(userId, date) {
    return db.prepare(
      'SELECT * FROM food_logs WHERE user_id = ? AND date = ? ORDER BY created_at ASC'
    ).all(userId, date);
  },

  getByDateRange(userId, startDate, endDate) {
    return db.prepare(`
      SELECT date, meal_type,
        SUM(calories * quantity) as total_calories,
        SUM(protein * quantity) as total_protein,
        SUM(fat * quantity) as total_fat,
        SUM(carbs * quantity) as total_carbs
      FROM food_logs
      WHERE user_id = ? AND date >= ? AND date <= ?
      GROUP BY date, meal_type
      ORDER BY date DESC
    `).all(userId, startDate, endDate);
  },

  create(userId, { date, mealType, food }) {
    return db.prepare(`
      INSERT INTO food_logs
        (user_id, date, meal_type, food_name, brand, serving_size, serving_size_g,
         quantity, calories, protein, fat, saturated_fat, carbs, sugar, fiber, sodium)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId, date, mealType,
      food.name,
      food.brand || null,
      food.servingSize || null,
      food.servingSizeG || null,
      food.quantity || 1,
      food.calories || 0,
      food.protein || 0,
      food.fat || 0,
      food.saturatedFat || 0,
      food.carbs || 0,
      food.sugar || 0,
      food.fiber || 0,
      food.sodium || 0
    );
  },

  deleteById(id, userId) {
    return db.prepare(
      'DELETE FROM food_logs WHERE id = ? AND user_id = ?'
    ).run(id, userId);
  },

  /** Format a DB row into the API response shape. */
  toJSON(row) {
    return {
      id: row.id,
      name: row.food_name,
      brand: row.brand,
      servingSize: row.serving_size,
      servingSizeG: row.serving_size_g,
      quantity: row.quantity,
      calories: row.calories,
      protein: row.protein,
      fat: row.fat,
      saturatedFat: row.saturated_fat,
      carbs: row.carbs,
      sugar: row.sugar,
      fiber: row.fiber,
      sodium: row.sodium,
    };
  },
};

module.exports = FoodLog;
