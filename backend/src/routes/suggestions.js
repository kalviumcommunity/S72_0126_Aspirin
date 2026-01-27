const express = require('express');
const router = express.Router();
const { travelSuggestions } = require('../data/mockData');

// Get all travel suggestions
router.get('/', (req, res) => {
  res.json(travelSuggestions);
});

module.exports = router;
