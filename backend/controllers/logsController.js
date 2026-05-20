const FoodLog = require('../models/FoodLog');

exports.getLogs = (req, res) => {
  try {
    const rows = FoodLog.getByDate(req.user.id, req.params.date);
    const meals = { breakfast: [], lunch: [], dinner: [], snacks: [] };
    rows.forEach((row) => {
      if (meals[row.meal_type]) meals[row.meal_type].push(FoodLog.toJSON(row));
    });
    return res.json({ success: true, date: req.params.date, meals });
  } catch (err) {
    console.error('Get logs error:', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch logs' });
  }
};

exports.getLogRange = (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    const rows = FoodLog.getByDateRange(req.user.id, startDate, endDate);

    const days = {};
    rows.forEach((row) => {
      if (!days[row.date]) days[row.date] = { calories: 0, protein: 0, fat: 0, carbs: 0 };
      days[row.date].calories += row.total_calories || 0;
      days[row.date].protein += row.total_protein || 0;
      days[row.date].fat += row.total_fat || 0;
      days[row.date].carbs += row.total_carbs || 0;
    });

    return res.json({ success: true, days });
  } catch (err) {
    console.error('Get log range error:', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch log range' });
  }
};

exports.addLog = (req, res) => {
  try {
    const { date, mealType, food } = req.body;
    if (!date || !mealType || !food || !food.name) {
      return res.status(400).json({ success: false, error: 'date, mealType, and food are required' });
    }
    const result = FoodLog.create(req.user.id, { date, mealType, food });
    return res.status(201).json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    console.error('Add log error:', err);
    return res.status(500).json({ success: false, error: 'Failed to add food log' });
  }
};

exports.deleteLog = (req, res) => {
  try {
    const result = FoodLog.deleteById(req.params.id, req.user.id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Log entry not found' });
    }
    return res.json({ success: true });
  } catch (err) {
    console.error('Delete log error:', err);
    return res.status(500).json({ success: false, error: 'Failed to delete log' });
  }
};
