const express = require('express')
const response = require('./middlewares/response')
const checkJwt = require('./middlewares/jwt')

const db = require('./models')

const authController = require('./controllers/auth')
const linkController = require('./controllers/link')
const { link } = require('@hapi/joi')

const app = express()

// Middlewares
app.use(response)
app.use(checkJwt)

// Accept json
app.use(express.json())
// Accept req.params
app.use(express.urlencoded({ extended: false }))

app.get('/', (_req, res) => {
  res.json('API running')
})

app.use('/auth', authController)

app.use('/link', linkController)

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server running on port 3001...')
  })
})
