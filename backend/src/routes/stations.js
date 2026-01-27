const express = require('express');
const router = express.Router();
const { stations, getStationsByLine } = require('../data/mockData');

// Get all stations
router.get('/', (req, res) => {
  const { line } = req.query;
  
  if (line && line !== 'all') {
    const filtered = getStationsByLine(line);
    return res.json(filtered);
  }
  
  res.json(stations);
});

// Get single station by ID
router.get('/:id', (req, res) => {
  const station = stations.find(s => s.id === req.params.id);
  if (!station) {
    return res.status(404).json({ error: 'Station not found' });
  }
  res.json(station);
});

module.exports = router;
