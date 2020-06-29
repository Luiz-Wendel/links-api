const express = require('express')

const authController = require('./controllers/auth')

const app = express()

app.get('/', (req, res) => {
  res.json('API running')
})

app.use('/auth', authController)

app.listen(3001, () => {
  console.log('Server running on port 3001...')
})
