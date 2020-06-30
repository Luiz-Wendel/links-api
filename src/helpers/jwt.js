require('dotenv').config()

const jwt = require('jsonwebtoken')

const privateKeyToken = process.env.JWT_PRIVATE_KEY_TOKEN
const refreshPrivateKeyToken = process.env.JWT_REFRESH_PRIVATE_KEY_TOKEN

const options = { expiresIn: '30 minutes' }
const refreshOptions = { expiresIn: '3 days' }

const generateJwt = (payload) => {
  return jwt.sign(payload, privateKeyToken, options)
}

const generateRefreshJwt = (payload) => {
  return jwt.sign(payload, refreshPrivateKeyToken, refreshOptions)
}

const verifyJwt = (token) => {
  return jwt.verify(token, privateKeyToken)
}

const verifyRefreshJwt = (refreshToken) => {
  return jwt.verify(refreshToken, refreshPrivateKeyToken)
}

module.exports = { generateJwt, generateRefreshJwt, verifyJwt, verifyRefreshJwt }
