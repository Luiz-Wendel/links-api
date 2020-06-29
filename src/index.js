const express = require('express')

const db = require('./models')

const authController = require('./controllers/auth')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.json('API running')
})

app.use('/auth', authController)

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server running on port 3001...')
  })
})
