const mongoose = require('mongoose');

const symptomSchema = new mongoose.Schema({
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
    required: true,
    enum: ['nausea', 'fatigue', 'headache', 'back-pain', 'swelling', 'cramping', 'contractions', 'bleeding', 'dizziness', 'other']
  },
  description: String,
  severity: {
    type: String,
    enum: ['mild', 'moderate', 'severe'],
    required: true
  },
  duration: {
    amount: Number,
    unit: {
      type: String,
      enum: ['hours', 'days', 'weeks']
    }
  },
  triggers: [String],
  location: String,
  imageUrl: String,
  aiAssessment: {
    riskLevel: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    },
    recommendations: [String],
    seekImmediateCare: Boolean,
    confidence: Number
  },
  actionTaken: {
    homeRemedies: [String],
    medications: [String],
    consultedDoctor: Boolean,
    doctorNotes: String
  },
  resolved: {
    type: Boolean,
    default: false
  },
  resolvedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

symptomSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Symptom', symptomSchema);