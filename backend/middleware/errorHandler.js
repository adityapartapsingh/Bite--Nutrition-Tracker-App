/**
 * Centralized Express error handler.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
}

module.exports = errorHandler;
