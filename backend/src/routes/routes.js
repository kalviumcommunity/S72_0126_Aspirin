const express = require('express');
const router = express.Router();
const { routeOptions } = require('../data/mockData');

// Get all route options
router.get('/', (req, res) => {
  res.json(routeOptions);
});

module.exports = router;
