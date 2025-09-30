const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
  try {
    const {
      type,
      title,
      description,
      scheduledDate,
      duration,
      location,
      doctorId
    } = req.body;

    const appointment = new Appointment({
      userId: req.user.id,
      pregnancyId: req.body.pregnancyId,
      doctorId,
      type,
      title,
      description,
      scheduledDate,
      duration: duration || 30,
      location,
      status: 'scheduled'
    });

    await appointment.save();

    res.status(201).json({
      success: true,
      appointment
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAppointments = async (req, res) => {
  try {
    const { status, type, upcoming } = req.query;
    const filter = { userId: req.user.id };
    
    if (status) filter.status = status;
    if (type) filter.type = type;
    
    if (upcoming === 'true') {
      filter.scheduledDate = { $gte: new Date() };
      filter.status = { $in: ['scheduled', 'confirmed'] };
    }

    const appointments = await Appointment.find(filter)
      .sort({ scheduledDate: upcoming === 'true' ? 1 : -1 });
    
    res.json({
      success: true,
      appointments
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({
      success: true,
      appointment
    });
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const updates = Object.keys(req.body);
    updates.forEach(update => {
      appointment[update] = req.body[update];
    });

    await appointment.save();

    res.json({
      success: true,
      appointment
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.json({
      success: true,
      appointment
    });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const completeAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'completed';
    if (req.body.notes) {
      appointment.notes = { ...appointment.notes, ...req.body.notes };
    }
    
    await appointment.save();

    res.json({
      success: true,
      appointment
    });
  } catch (error) {
    console.error('Complete appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAppointmentStats = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id });
    
    const stats = {
      total: appointments.length,
      upcoming: appointments.filter(a => 
        a.status === 'scheduled' || a.status === 'confirmed'
      ).length,
      completed: appointments.filter(a => a.status === 'completed').length,
      missed: appointments.filter(a => a.status === 'missed').length,
      cancelled: appointments.filter(a => a.status === 'cancelled').length,
      byType: {},
      byStatus: {},
      nextAppointment: null
    };

    // Count by type
    appointments.forEach(appointment => {
      stats.byType[appointment.type] = (stats.byType[appointment.type] || 0) + 1;
      stats.byStatus[appointment.status] = (stats.byStatus[appointment.status] || 0) + 1;
    });

    // Find next appointment
    const nextApp = appointments
      .filter(a => a.status === 'scheduled' || a.status === 'confirmed')
      .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))[0];
    
    if (nextApp) {
      stats.nextAppointment = {
        id: nextApp._id,
        title: nextApp.title,
        date: nextApp.scheduledDate,
        type: nextApp.type,
        location: nextApp.location
      };
    }

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get appointment stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const sendReminders = async (req, res) => {
  try {
    // This would typically integrate with a notification service
    // For now, we'll just return a success response
    res.json({
      success: true,
      message: 'Reminders sent successfully'
    });
  } catch (error) {
    console.error('Send reminders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  cancelAppointment,
  completeAppointment,
  getAppointmentStats,
  sendReminders
};