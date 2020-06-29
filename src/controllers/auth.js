const express = require('express')

const router = express.Router()

router.get('/sign-in', (req, res) => {
  res.json('Sign-in')
})

router.get ('/sign-up', (req, res) => {
  res.json('sign-up')
})

module.exports = router
