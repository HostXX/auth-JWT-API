console.log('api')

const express = require('express');

const apiService = require('./apiService');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'APIS ENTRY POINT ROOT'
  });
});

router.use('/apiservice', apiService);

module.exports = router;