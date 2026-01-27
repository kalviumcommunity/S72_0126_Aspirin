const express = require('express');
const router = express.Router();
const { trains, getTrainsByLine, getTrainsByStatus } = require('../data/mockData');

// Get all trains
router.get('/', (req, res) => {
  const { line, status } = req.query;
  
  let filtered = trains;
  
  if (line && line !== 'all') {
    filtered = getTrainsByLine(line);
  }
  
  if (status && status !== 'all') {
    filtered = getTrainsByStatus(status);
  }
  
  res.json(filtered);
});

// Get single train by ID
router.get('/:id', (req, res) => {
  const train = trains.find(t => t.id === req.params.id);
  if (!train) {
    return res.status(404).json({ error: 'Train not found' });
  }
  res.json(train);
});

module.exports = router;
