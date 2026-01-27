const express = require('express');
const router = express.Router();
const { communityReports, trains } = require('../data/mockData');

// Get all community reports
router.get('/', (req, res) => {
  res.json(communityReports);
});

// Get single report by ID
router.get('/:id', (req, res) => {
  const report = communityReports.find(r => r.id === req.params.id);
  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }
  res.json(report);
});

// Create new report
router.post('/', (req, res) => {
  const { trainId, delayType, additionalInfo } = req.body;
  
  if (!trainId || !delayType) {
    return res.status(400).json({ error: 'trainId and delayType are required' });
  }
  
  const train = trains.find(t => t.id === trainId);
  if (!train) {
    return res.status(404).json({ error: 'Train not found' });
  }
  
  const newReport = {
    id: `report-${Date.now()}`,
    trainId,
    trainName: `${train.name} (${train.number})`,
    delayType,
    additionalInfo,
    timestamp: new Date(),
    reportCount: 1,
  };
  
  communityReports.unshift(newReport);
  res.status(201).json(newReport);
});

module.exports = router;
