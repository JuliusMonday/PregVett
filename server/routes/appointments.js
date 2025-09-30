const express = require('express');
const { auth } = require('../middleware/auth');
const {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  cancelAppointment,
  completeAppointment,
  getAppointmentStats,
  sendReminders
} = require('../controllers/appointmentController');

const router = express.Router();

router.post('/', auth, createAppointment);
router.get('/', auth, getAppointments);
router.get('/stats', auth, getAppointmentStats);
router.post('/reminders', auth, sendReminders);
router.get('/:id', auth, getAppointment);
router.put('/:id', auth, updateAppointment);
router.put('/:id/cancel', auth, cancelAppointment);
router.put('/:id/complete', auth, completeAppointment);

module.exports = router;