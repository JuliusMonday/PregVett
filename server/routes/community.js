const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Placeholder routes - will be implemented
router.get('/', auth, (req, res) => {
  res.json({ message: 'Community route' });
});

module.exports = router;