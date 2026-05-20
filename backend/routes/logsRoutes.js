const router = require('express').Router();
const ctrl = require('../controllers/logsController');

router.get('/range/:startDate/:endDate', ctrl.getLogRange);
router.get('/:date', ctrl.getLogs);
router.post('/', ctrl.addLog);
router.delete('/:id', ctrl.deleteLog);

module.exports = router;
