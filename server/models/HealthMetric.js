const mongoose = require('mongoose');

const healthMetricSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pregnancyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pregnancy'
  },
  type: {
    type: String,
    enum: ['weight', 'blood-pressure', 'glucose', 'movement', 'mood'],
    required: true
  },
  value: {
    amount: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: String,
  withinNormalRange: {
    type: Boolean,
    default: true
  },
  recommendations: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

healthMetricSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('HealthMetric', healthMetricSchema);