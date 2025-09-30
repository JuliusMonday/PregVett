const express = require('express');
const { auth } = require('../middleware/auth');
const {
  logSymptom,
  getSymptoms,
  getSymptom,
  updateSymptom,
  resolveSymptom,
  getSymptomStats
} = require('../controllers/symptomController');

const router = express.Router();

router.post('/', auth, logSymptom);
router.get('/', auth, getSymptoms);
router.get('/stats', auth, getSymptomStats);
router.get('/:id', auth, getSymptom);
router.put('/:id', auth, updateSymptom);
router.put('/:id/resolve', auth, resolveSymptom);

module.exports = router;