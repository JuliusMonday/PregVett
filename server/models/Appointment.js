const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pregnancyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pregnancy'
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: ['anc', 'ultrasound', 'blood-test', 'consultation', 'emergency', 'delivery', 'postnatal'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  scheduledDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    default: 30
  },
  location: {
    name: String,
    address: String,
    phone: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'missed', 'cancelled'],
    default: 'scheduled'
  },
  reminders: [{
    type: {
      type: String,
      enum: ['push', 'sms', 'email']
    },
    sent: {
      type: Boolean,
      default: false
    },
    sentAt: Date
  }],
  notes: {
    preAppointment: String,
    postAppointment: String,
    doctorNotes: String
  },
  documents: [{
    name: String,
    url: String,
    uploadedAt: Date
  }],
  cost: {
    amount: Number,
    currency: {
      type: String,
      default: 'NGN'
    },
    paid: {
      type: Boolean,
      default: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

appointmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);