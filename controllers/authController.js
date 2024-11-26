const jwt = require('jsonwebtoken');
const { findUserByUsername } = require('../models/userModel');

let refreshTokens = [];

const login = (req, res, next) => {
  const { username, password } = req.body;

  const user = findUserByUsername(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.SECRET_KEY, { expiresIn: '7d' });

  refreshTokens.push(refreshToken);
  res.json({ token, refreshToken });
};

const refreshToken = (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Refresh token is required or invalid' });
  }

  jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    const newToken = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token: newToken });
  });
};

const logout = (req, res, next) => {
  const { refreshToken } = req.body;

  refreshTokens = refreshTokens.filter(token => token !== refreshToken);
  res.json({ message: 'Logged out successfully' });
};

module.exports = { login, refreshToken, logout };