const express = require('express')
const bcrypt = require('bcrypt')

const { Account } = require('../models')

const router = express.Router()

router.get('/sign-in', (req, res) => {
  res.json('Sign-in')
})

router.get ('/sign-up', async (req, res) => {
  const email = 'teste@teste.com'
  const password = '123456'

  const hash = bcrypt.hashSync(password, 10)

  const result = await Account.create({email, password: hash})

  res.json(result)
})

module.exports = router
