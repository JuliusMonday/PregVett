const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'doctor', 'admin'],
    default: 'user'
  },
  profile: {
    age: Number,
    location: {
      state: String,
      lga: String
    },
    emergencyContacts: [{
      name: String,
      phone: String,
      relationship: String
    }],
    language: {
      type: String,
      enum: ['English', 'Hausa', 'Yoruba', 'Igbo', 'Pidgin'],
      default: 'English'
    },
    avatar: String,
    preferences: {
      notifications: {
        type: Boolean,
        default: true
      },
      darkMode: {
        type: Boolean,
        default: false
      }
    }
  },
  medicalHistory: {
    obstetricHistory: {
      isFirstPregnancy: Boolean,
      previousLiveBirths: Number,
      previousComplications: [{
        type: String,
        enum: ['miscarriage', 'pre-eclampsia', 'gestational-diabetes', 'c-section', 'other']
      }]
    },
    preExistingConditions: [{
      type: String,
      enum: ['hypertension', 'diabetes', 'anemia', 'hiv', 'sickle-cell', 'other']
    }],
    allergies: [String],
    medications: [String]
  },
  onboardingCompleted: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);