const router = require('express').Router();
const ctrl = require('../controllers/nutritionController');

router.get('/barcode/:barcode', ctrl.lookupBarcode);
router.get('/search', ctrl.searchFood);

module.exports = router;
