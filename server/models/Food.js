const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  localName: String,
  category: {
    type: String,
    enum: ['grains', 'proteins', 'vegetables', 'fruits', 'dairy', 'fats', 'others'],
    required: true
  },
  nutrition: {
    calories: Number,
    protein: Number,
    carbohydrates: Number,
    fats: Number,
    fiber: Number,
    folate: Number,
    iron: Number,
    calcium: Number,
    vitaminA: Number,
    vitaminC: Number,
    vitaminD: Number,
    zinc: Number,
    magnesium: Number
  },
  pregnancySafety: {
    safe: {
      type: Boolean,
      default: true
    },
    riskLevel: {
      type: String,
      enum: ['none', 'low', 'medium', 'high'],
      default: 'none'
    },
    warnings: [String],
    trimesterNotes: {
      first: String,
      second: String,
      third: String
    }
  },
  origin: {
    type: String,
    enum: ['nigerian', 'international'],
    default: 'nigerian'
  },
  region: String,
  seasonality: String,
  preparation: [String],
  benefits: [String],
  imageUrl: String,
  isActive: {
    type: Boolean,
    default: true
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

foodSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Food', foodSchema);