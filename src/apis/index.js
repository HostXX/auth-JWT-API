console.log('api')

const express = require('express');

// get all the routes
const apiService = require('./apiService');
const postPublications = require('./postPublications');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'APIS ENTRY POINT ROOT'
  });
});

router.use('/apiservice', apiService);
router.use('/postPublications', postPublications);

module.exports = router;