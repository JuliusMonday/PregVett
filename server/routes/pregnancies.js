const express = require('express');
const { auth } = require('../middleware/auth');
const {
  createPregnancy,
  getPregnancies,
  getPregnancy,
  updatePregnancy,
  updatePregnancyWeek,
  addMilestone,
  completeMilestone,
  getPregnancyStats
} = require('../controllers/pregnancyController');

const router = express.Router();

router.post('/', auth, createPregnancy);
router.get('/', auth, getPregnancies);
router.get('/stats', auth, getPregnancyStats);
router.get('/:id', auth, getPregnancy);
router.put('/:id', auth, updatePregnancy);
router.put('/:id/week', auth, updatePregnancyWeek);
router.post('/:id/milestones', auth, addMilestone);
router.put('/:id/milestones/:milestoneId/complete', auth, completeMilestone);

module.exports = router;