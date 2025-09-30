const Symptom = require('../models/Symptom');

const logSymptom = async (req, res) => {
  try {
    const {
      type,
      description,
      severity,
      duration,
      triggers,
      location,
      imageUrl
    } = req.body;

    const symptom = new Symptom({
      userId: req.user.id,
      pregnancyId: req.body.pregnancyId,
      type,
      description,
      severity,
      duration,
      triggers,
      location,
      imageUrl
    });

    // AI Assessment (simplified for demo)
    const aiAssessment = await performAIAssessment(symptom);
    symptom.aiAssessment = aiAssessment;

    await symptom.save();

    res.status(201).json({
      success: true,
      symptom
    });
  } catch (error) {
    console.error('Log symptom error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getSymptoms = async (req, res) => {
  try {
    const { pregnancyId, type, severity } = req.query;
    const filter = { userId: req.user.id };
    
    if (pregnancyId) filter.pregnancyId = pregnancyId;
    if (type) filter.type = type;
    if (severity) filter.severity = severity;

    const symptoms = await Symptom.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      symptoms
    });
  } catch (error) {
    console.error('Get symptoms error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getSymptom = async (req, res) => {
  try {
    const symptom = await Symptom.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!symptom) {
      return res.status(404).json({ message: 'Symptom not found' });
    }

    res.json({
      success: true,
      symptom
    });
  } catch (error) {
    console.error('Get symptom error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateSymptom = async (req, res) => {
  try {
    const symptom = await Symptom.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!symptom) {
      return res.status(404).json({ message: 'Symptom not found' });
    }

    const updates = Object.keys(req.body);
    updates.forEach(update => {
      symptom[update] = req.body[update];
    });

    await symptom.save();

    res.json({
      success: true,
      symptom
    });
  } catch (error) {
    console.error('Update symptom error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const resolveSymptom = async (req, res) => {
  try {
    const symptom = await Symptom.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!symptom) {
      return res.status(404).json({ message: 'Symptom not found' });
    }

    symptom.resolved = true;
    symptom.resolvedAt = Date.now();
    
    if (req.body.actionTaken) {
      symptom.actionTaken = { ...symptom.actionTaken, ...req.body.actionTaken };
    }

    await symptom.save();

    res.json({
      success: true,
      symptom
    });
  } catch (error) {
    console.error('Resolve symptom error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getSymptomStats = async (req, res) => {
  try {
    const { pregnancyId } = req.query;
    const filter = { userId: req.user.id };
    if (pregnancyId) filter.pregnancyId = pregnancyId;

    const symptoms = await Symptom.find(filter);
    
    const stats = {
      total: symptoms.length,
      resolved: symptoms.filter(s => s.resolved).length,
      active: symptoms.filter(s => !s.resolved).length,
      byType: {},
      bySeverity: {},
      byRiskLevel: {}
    };

    symptoms.forEach(symptom => {
      // By type
      stats.byType[symptom.type] = (stats.byType[symptom.type] || 0) + 1;
      
      // By severity
      stats.bySeverity[symptom.severity] = (stats.bySeverity[symptom.severity] || 0) + 1;
      
      // By risk level
      const riskLevel = symptom.aiAssessment?.riskLevel || 'unknown';
      stats.byRiskLevel[riskLevel] = (stats.byRiskLevel[riskLevel] || 0) + 1;
    });

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get symptom stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const performAIAssessment = async (symptom) => {
  // Simplified AI assessment logic
  // In a real implementation, this would call an AI service
  
  const riskMatrix = {
    'bleeding': { severe: 'critical', moderate: 'high', mild: 'high' },
    'contractions': { severe: 'high', moderate: 'medium', mild: 'low' },
    'headache': { severe: 'medium', moderate: 'low', mild: 'low' },
    'nausea': { severe: 'low', moderate: 'low', mild: 'low' },
    'swelling': { severe: 'medium', moderate: 'low', mild: 'low' },
    'dizziness': { severe: 'medium', moderate: 'low', mild: 'low' }
  };

  const riskLevel = riskMatrix[symptom.type]?.[symptom.severity] || 'low';
  
  const recommendations = [];
  let seekImmediateCare = false;

  if (riskLevel === 'critical') {
    recommendations.push('Seek immediate medical attention');
    seekImmediateCare = true;
  } else if (riskLevel === 'high') {
    recommendations.push('Contact your healthcare provider immediately');
    recommendations.push('Monitor symptoms closely');
  } else if (riskLevel === 'medium') {
    recommendations.push('Schedule an appointment with your healthcare provider');
    recommendations.push('Rest and monitor symptoms');
  } else {
    recommendations.push('Monitor symptoms');
    recommendations.push('Try home remedies if appropriate');
  }

  // Add specific recommendations based on symptom type
  switch (symptom.type) {
    case 'nausea':
      recommendations.push('Eat small, frequent meals');
      recommendations.push('Stay hydrated');
      recommendations.push('Try ginger or peppermint tea');
      break;
    case 'headache':
      recommendations.push('Rest in a quiet, dark room');
      recommendations.push('Stay hydrated');
      recommendations.push('Consider acetaminophen if approved by your doctor');
      break;
    case 'swelling':
      recommendations.push('Elevate your feet');
      recommendations.push('Reduce sodium intake');
      recommendations.push('Stay hydrated');
      break;
  }

  return {
    riskLevel,
    recommendations,
    seekImmediateCare,
    confidence: 0.85
  };
};

module.exports = {
  logSymptom,
  getSymptoms,
  getSymptom,
  updateSymptom,
  resolveSymptom,
  getSymptomStats
};