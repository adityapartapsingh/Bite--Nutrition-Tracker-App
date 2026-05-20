const User = require('../models/User');

exports.updateGoals = (req, res) => {
  try {
    const { calories, protein, fat, carbs } = req.body;
    User.updateGoals(req.user.id, { calories, protein, fat, carbs });
    return res.json({ success: true });
  } catch (err) {
    console.error('Update goals error:', err);
    return res.status(500).json({ success: false, error: 'Failed to update goals' });
  }
};
