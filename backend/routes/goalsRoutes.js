const router = require('express').Router();
const ctrl = require('../controllers/goalsController');

router.put('/', ctrl.updateGoals);

module.exports = router;
