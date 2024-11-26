const express = require('express');
const { getAllUsers, getUserProfile } = require('../controllers/userController');
const { verifyToken, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, authorize('admin'), getAllUsers);
router.get('/profile', verifyToken, getUserProfile);

module.exports = router;