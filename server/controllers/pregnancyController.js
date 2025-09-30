const Pregnancy = require('../models/Pregnancy');
const User = require('../models/User');

const createPregnancy = async (req, res) => {
  try {
    const { lmp, dueDate, currentWeek, status, riskLevel } = req.body;
    
    const pregnancy = new Pregnancy({
      userId: req.user.id,
      lmp,
      dueDate,
      currentWeek: currentWeek || 1,
      status: status || 'active',
      riskLevel: riskLevel || 'low'
    });

    await pregnancy.save();

    res.status(201).json({
      success: true,
      pregnancy
    });
  } catch (error) {
    console.error('Create pregnancy error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPregnancies = async (req, res) => {
  try {
    const pregnancies = await Pregnancy.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      pregnancies
    });
  } catch (error) {
    console.error('Get pregnancies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPregnancy = async (req, res) => {
  try {
    const pregnancy = await Pregnancy.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!pregnancy) {
      return res.status(404).json({ message: 'Pregnancy not found' });
    }

    res.json({
      success: true,
      pregnancy
    });
  } catch (error) {
    console.error('Get pregnancy error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePregnancy = async (req, res) => {
  try {
    const pregnancy = await Pregnancy.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!pregnancy) {
      return res.status(404).json({ message: 'Pregnancy not found' });
    }

    const updates = Object.keys(req.body);
    updates.forEach(update => {
      pregnancy[update] = req.body[update];
    });

    await pregnancy.save();

    res.json({
      success: true,
      pregnancy
    });
  } catch (error) {
    console.error('Update pregnancy error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePregnancyWeek = async (req, res) => {
  try {
    const pregnancy = await Pregnancy.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!pregnancy) {
      return res.status(404).json({ message: 'Pregnancy not found' });
    }

    // Calculate current week based on LMP
    const lmpDate = new Date(pregnancy.lmp);
    const currentDate = new Date();
    const weeksDiff = Math.floor((currentDate - lmpDate) / (7 * 24 * 60 * 60 * 1000));
    
    pregnancy.currentWeek = Math.max(1, Math.min(weeksDiff, 42));
    await pregnancy.save();

    res.json({
      success: true,
      pregnancy
    });
  } catch (error) {
    console.error('Update pregnancy week error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addMilestone = async (req, res) => {
  try {
    const pregnancy = await Pregnancy.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!pregnancy) {
      return res.status(404).json({ message: 'Pregnancy not found' });
    }

    const { week, title, description } = req.body;
    
    pregnancy.milestones.push({
      week,
      title,
      description,
      completed: false
    });

    await pregnancy.save();

    res.json({
      success: true,
      pregnancy
    });
  } catch (error) {
    console.error('Add milestone error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const completeMilestone = async (req, res) => {
  try {
    const pregnancy = await Pregnancy.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!pregnancy) {
      return res.status(404).json({ message: 'Pregnancy not found' });
    }

    const milestone = pregnancy.milestones.id(req.params.milestoneId);
    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' });
    }

    milestone.completed = true;
    milestone.completedAt = Date.now();
    await pregnancy.save();

    res.json({
      success: true,
      pregnancy
    });
  } catch (error) {
    console.error('Complete milestone error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPregnancyStats = async (req, res) => {
  try {
    const pregnancy = await Pregnancy.findOne({
      userId: req.user.id,
      status: 'active'
    });

    if (!pregnancy) {
      return res.status(404).json({ message: 'No active pregnancy found' });
    }

    const lmpDate = new Date(pregnancy.lmp);
    const dueDate = new Date(pregnancy.dueDate);
    const currentDate = new Date();
    
    const totalDays = Math.floor((dueDate - lmpDate) / (24 * 60 * 60 * 1000));
    const daysPassed = Math.floor((currentDate - lmpDate) / (24 * 60 * 60 * 1000));
    const daysRemaining = Math.floor((dueDate - currentDate) / (24 * 60 * 60 * 1000));
    
    const progress = Math.round((daysPassed / totalDays) * 100);
    const trimester = Math.floor(pregnancy.currentWeek / 13) + 1;

    res.json({
      success: true,
      stats: {
        currentWeek: pregnancy.currentWeek,
        trimester,
        dueDate: pregnancy.dueDate,
        daysRemaining: Math.max(0, daysRemaining),
        progress: Math.min(100, Math.max(0, progress)),
        riskLevel: pregnancy.riskLevel,
        status: pregnancy.status
      }
    });
  } catch (error) {
    console.error('Get pregnancy stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createPregnancy,
  getPregnancies,
  getPregnancy,
  updatePregnancy,
  updatePregnancyWeek,
  addMilestone,
  completeMilestone,
  getPregnancyStats
};