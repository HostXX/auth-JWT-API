console.log('api service')
const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
  res.json({
    "message" : "Hi from the apiService "
  })
})

module.exports = router;