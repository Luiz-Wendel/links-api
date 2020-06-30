const express = require('express')
const response = require('./middlewares/response')

const db = require('./models')

const authController = require('./controllers/auth')
const linkController = require('./controllers/link')
const { link } = require('@hapi/joi')

const app = express()

// Middlewares
app.use(response)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.json('API running')
})

app.use('/auth', authController)

app.use('/link', linkController)

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server running on port 3001...')
  })
})
