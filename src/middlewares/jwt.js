const { verifyJwt } = require('../helpers/jwt')

const checkJwt = (req, res, next) => {
  let token = req.headers['authorization']

  // Remove 'Bearer ' from token string
  token = token ? token.slice(7, token.length) : null
console.log(token)
  if (!token)
    return res.jsonUnauthorized(null, 'Invalid token!')

  try {
    const decoded = verifyJwt(token)

    req.accountId = decoded.id

    next()
  } catch (error) {
    return res.jsonUnauthorized(null, 'Invalid token!')
  }
}

module.exports = checkJwt
