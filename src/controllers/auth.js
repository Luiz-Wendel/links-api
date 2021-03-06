const express = require('express')
const bcrypt = require('bcrypt')

const { Account } = require('../models')
const { accountSignUp, accountSignIn } = require('../validators/account')
const { getMessage } = require('../helpers/messages')
const { generateJwt, generateRefreshJwt, verifyRefreshJwt, getTokenFromHeaders } = require('../helpers/jwt')

const router = express.Router()

router.post('/sign-in', accountSignIn, async (req, res) => {
  // Retrieve variables from request body
  const { email, password } = req.body

  // Check db for an account with the email recieved
  const account = await Account.findOne({where: {email}})

  // If account is found compare the passwords, if not set match as null
  const match = account ? bcrypt.compareSync(password, account.password) : null

  // If passwords doesn't match, or account doesn't exist, return bad request
  if (!match)
    return res.jsonBadRequest(null, getMessage('account.signin.invalid'))

  // Create JWT tokens
  const jwtToken = generateJwt({ id: account.id })
  const jwtRefreshToken = generateRefreshJwt({ id: account.id, version: account.jwtVersion })

  res.jsonOK(account, getMessage('account.signin.success'), { jwtToken, jwtRefreshToken })
})

router.post ('/sign-up', accountSignUp, async (req, res) => {
  const { email, password } = req.body

  // Check db for an account with the email recieved
  const account = await Account.findOne({where: {email}})

  // If account already exist's then return bad request
  if (account)
    return res.jsonBadRequest(null, getMessage('account.signup.email_exists'))

  // Hash password for better security
  const hash = bcrypt.hashSync(password, 10)

  // Create a new account with encrypted password
  const newAccount = await Account.create({email, password: hash})

  // Create JWT tokens
  const jwtToken = generateJwt({ id: newAccount.id })
  const jwtRefreshToken = generateRefreshJwt({ id: newAccount.id, version: newAccount.jwtVersion })

  res.jsonOK(newAccount, getMessage('account.signup.success'), { jwtToken, jwtRefreshToken })
})

router.post ('/refresh', async (req, res) => {
  const token = getTokenFromHeaders(req.headers)

  if (!token)
    return res.jsonUnauthorized(null, 'Invalid token!')

  try {
    const decoded = verifyRefreshJwt(token)

    const account = await Account.findByPk(decoded.id)

    if (!account)
      return res.jsonUnauthorized(null, 'Invalid token!')

    if (decoded.version != account.jwtVersion)
    return res.jsonUnauthorized(null, 'Invalid token!')

    const meta = {
      token: generateJwt({ id: account.id })
    }

    return res.jsonOK(null, null, meta)
  } catch (error) {
    return res.jsonUnauthorized(null, 'Invalid token!')
  }
})

module.exports = router
