const { verifyJwt } = require('../helpers/jwt')

const checkJwt = (req, res, next) => {
  // Get the 'url' from req variable and set an alias 'path'
  const { url: path } = req

  // Paths to skip JWT verification
  const excludedPaths = ['/auth/sign-in', '/auth/sign-up']

  // Check if path is excluded and transform to boolean (!!)
  const isExcluded = !!excludedPaths.find(p => p.startsWith(path))

  if (isExcluded)
    return next()

  let token = req.headers['authorization']

  // Remove 'Bearer ' from token string
  token = token ? token.slice(7, token.length) : null

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
