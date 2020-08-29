console.log('api')

const express = require('express');

// get all the routes
const apiService = require('./apiService');
const authService = require('./routes/auth');
const postPublicationsService = require('./postPublications');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'APIS ENTRY POINT ROOT'
  });
});

router.use('/auth', authService)
router.use('/apiservice', apiService);
router.use('/postPublications', postPublicationsService);

module.exports = router;