const express = require('express')
const bcrypt = require('bcrypt')

const { Account } = require('../models')

const router = express.Router()

router.get('/sign-in', (req, res) => {
  res.json('Sign-in')
})

router.get ('/sign-up', async (req, res) => {
  const { email, password } = req.body

  const account = await Account.findOne({where: {email}})

  if (account)
    return res.jsonBadRequest(null, 'Account already exists!')

  const hash = bcrypt.hashSync(password, 10)

  const newAccount = await Account.create({email, password: hash})

  res.jsonOK(newAccount, 'Account created!')
})

module.exports = router
