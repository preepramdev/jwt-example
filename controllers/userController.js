const { users } = require('../models/userModel');

const getAllUsers = (req, res) => {
  res.json(users);
};

const getUserProfile = (req, res) => {
  const user = req.user; // Populated by authMiddleware
  res.json({ id: user.id, username: user.username, role: user.role });
};

module.exports = { getAllUsers, getUserProfile };