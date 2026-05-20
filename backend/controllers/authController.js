const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret, jwtExpiry } = require('../config');

function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: jwtExpiry });
}

exports.register = (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: 'Username, email, and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
    }

    const existing = User.findByUsernameOrEmail(username, email);
    if (existing) {
      return res.status(409).json({ success: false, error: 'Username or email already taken' });
    }

    const hash = bcrypt.hashSync(password, 10);
    const result = User.create(username, email, hash);
    const user = { id: result.lastInsertRowid, username };
    const token = generateToken(user);

    return res.status(201).json({ success: true, token, user: { id: user.id, username, email } });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, error: 'Registration failed' });
  }
};

exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = User.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = generateToken(user);

    return res.json({ success: true, token, user: User.toJSON(user) });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, error: 'Login failed' });
  }
};

exports.getMe = (req, res) => {
  const user = User.findById(req.user.id);
  if (!user) return res.status(404).json({ success: false, error: 'User not found' });
  return res.json({ success: true, user: User.toJSON(user) });
};
