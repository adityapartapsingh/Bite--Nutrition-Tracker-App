const router = require('express').Router();
const multer = require('multer');
const aiController = require('../controllers/aiController');
const auth = require('../middleware/auth');

// Setup multer to store the uploaded image in memory
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// We can require authentication for AI scans if we want, or leave it open
// Let's protect it so only logged-in users use our API key bandwidth
router.post('/scan', auth, upload.single('image'), aiController.analyzeImage);

module.exports = router;
