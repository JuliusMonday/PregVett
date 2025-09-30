const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Mock emergency facilities data
const emergencyFacilities = [
  {
    id: 1,
    name: 'Lagos University Teaching Hospital (LUTH)',
    type: 'Teaching Hospital',
    address: 'Idi-Araba, Mushin, Lagos',
    phone: '07002255382',
    coordinates: { latitude: 6.5244, longitude: 3.3792 },
    services: ['24/7 Emergency', 'Maternity', 'Surgery', 'ICU'],
    distance: 2.5
  },
  {
    id: 2,
    name: 'National Hospital Abuja',
    type: 'Federal Hospital',
    address: 'Central Business District, Abuja',
    phone: '07091420000',
    coordinates: { latitude: 9.0589, longitude: 7.4914 },
    services: ['24/7 Emergency', 'Maternity', 'Neonatal Care'],
    distance: 5.2
  },
  {
    id: 3,
    name: 'University College Hospital (UCH) Ibadan',
    type: 'Teaching Hospital',
    address: 'Queen Elizabeth Road, Ibadan',
    phone: '07002255382',
    coordinates: { latitude: 7.3775, longitude: 3.9470 },
    services: ['24/7 Emergency', 'Maternity', 'Pediatrics'],
    distance: 8.1
  }
];

// Send emergency alert
router.post('/alert', auth, async (req, res) => {
  try {
    const { type, location, message, severity } = req.body;
    
    // In a real implementation, this would:
    // 1. Send notifications to emergency contacts
    // 2. Alert nearby healthcare facilities
    // 3. Notify emergency services
    // 4. Log the emergency alert
    
    const emergencyAlert = {
      userId: req.user.id,
      type: type || 'general',
      location: location || {},
      message: message || 'Emergency assistance needed',
      severity: severity || 'high',
      timestamp: new Date(),
      status: 'active'
    };

    // Mock response - in real implementation, this would save to database
    console.log('Emergency alert received:', emergencyAlert);

    res.json({
      success: true,
      message: 'Emergency alert sent successfully',
      alertId: Date.now(),
      contactsNotified: 3,
      facilitiesNotified: 2
    });
  } catch (error) {
    console.error('Send emergency alert error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get nearby emergency facilities
router.get('/facilities', auth, async (req, res) => {
  try {
    const { latitude, longitude, radius = 10 } = req.query;
    
    let facilities = emergencyFacilities;
    
    // If coordinates are provided, calculate distances and filter
    if (latitude && longitude) {
      facilities = emergencyFacilities.map(facility => {
        const distance = calculateDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          facility.coordinates.latitude,
          facility.coordinates.longitude
        );
        return { ...facility, distance };
      }).filter(facility => facility.distance <= radius)
        .sort((a, b) => a.distance - b.distance);
    }

    res.json({
      success: true,
      facilities,
      total: facilities.length
    });
  } catch (error) {
    console.error('Get emergency facilities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get emergency contacts
router.get('/contacts', auth, async (req, res) => {
  try {
    // In a real implementation, this would fetch from user's profile
    const emergencyContacts = [
      { name: 'Spouse', phone: '+2348012345678', relationship: 'husband' },
      { name: 'Mother', phone: '+2348098765432', relationship: 'mother' },
      { name: 'Doctor', phone: '+2348011223344', relationship: 'healthcare' }
    ];

    res.json({
      success: true,
      contacts: emergencyContacts
    });
  } catch (error) {
    console.error('Get emergency contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get emergency guidelines
router.get('/guidelines', auth, async (req, res) => {
  try {
    const guidelines = [
      {
        title: 'When to Call Emergency Services',
        conditions: [
          'Severe vaginal bleeding',
          'Severe abdominal pain',
          'Reduced fetal movement',
          'Severe headaches with vision changes',
          'Sudden swelling in face or hands',
          'Fever over 100.4°F (38°C)',
          'Severe vomiting or dehydration',
          'Contractions before 37 weeks',
          'Chest pain or difficulty breathing'
        ]
      },
      {
        title: 'Emergency First Aid',
        instructions: [
          'Stay calm and lie on your left side',
          'Call emergency services immediately',
          'Contact your emergency contacts',
          'Have your pregnancy information ready',
          'Do not eat or drink anything',
          'Keep track of symptoms and timing'
        ]
      },
      {
        title: 'Emergency Numbers',
        numbers: [
          { service: 'National Emergency', number: '112' },
          { service: 'Ambulance', number: '122' },
          { service: 'Police', number: '112' },
          { service: 'Fire Service', number: '112' }
        ]
      }
    ];

    res.json({
      success: true,
      guidelines
    });
  } catch (error) {
    console.error('Get emergency guidelines error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

module.exports = router;