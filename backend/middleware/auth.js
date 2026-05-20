const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

/**
 * Express middleware: verify JWT from Authorization header.
 * Attaches req.user = { id, username } on success.
 */
function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(header.split(' ')[1], jwtSecret);
    req.user = { id: decoded.id, username: decoded.username };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
}

module.exports = auth;
