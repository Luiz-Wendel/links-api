const express = require('express')
const bcrypt = require('bcrypt')

const { Account } = require('../models')
const { accountSignUp } = require('../validators/account')
const { getMessage } = require('../helpers/messages')

const router = express.Router()

router.get('/sign-in', (req, res) => {
  res.jsonOK(null)
})

router.get ('/sign-up', accountSignUp, async (req, res) => {
  const { email, password } = req.body

  const account = await Account.findOne({where: {email}})

  if (account)
    return res.jsonBadRequest(null, getMessage('account.signup.email_exists'))

  const hash = bcrypt.hashSync(password, 10)

  const newAccount = await Account.create({email, password: hash})

  res.jsonOK(newAccount, getMessage('account.signup.success'))
})

module.exports = router
