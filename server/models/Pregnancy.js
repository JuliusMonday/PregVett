const mongoose = require('mongoose');

const pregnancySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lmp: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  currentWeek: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'terminated'],
    default: 'active'
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  milestones: [{
    week: Number,
    title: String,
    description: String,
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date
  }],
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  healthMetrics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthMetric'
  }],
  symptoms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Symptom'
  }],
  nutrition: {
    dailyGoals: {
      folate: { type: Number, default: 600 },
      iron: { type: Number, default: 27 },
      calcium: { type: Number, default: 1000 },
      protein: { type: Number, default: 71 }
    },
    mealPlans: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MealPlan'
    }]
  },
  complications: [{
    type: String,
    description: String,
    diagnosedAt: Date,
    resolved: Boolean,
    resolvedAt: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

pregnancySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Pregnancy', pregnancySchema);