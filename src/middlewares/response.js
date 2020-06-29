const TYPE_JSON = 'application/json'
const STATUS_CODE_OK = 200
const STATUS_CODE_BAD_REQUEST = 400
const STATUS_CODE_UNAUTHORIZED = 401
const STATUS_CODE_NOT_FOUND = 404
const STATUS_CODE_SERVER_ERROR = 500

const jsonOK = function (data, message, metadata) {
  const status = STATUS_CODE_OK

  message = message ? message : 'Successful request!'
  metadata = metadata ? metadata : {}

  // Define res status to 200
  this.status(status)
  // Define res header to 'application/json'
  this.type(TYPE_JSON)

  // Return res.json() with the values defined
  return this.json({ status, message, data, metadata })
}

const jsonBadRequest = function (data, message, metadata) {
  const status = STATUS_CODE_BAD_REQUEST

  message = message ? message : 'Bad request!'
  metadata = metadata ? metadata : {}

  // Define res status to 200
  this.status(status)
  // Define res header to 'application/json'
  this.type(TYPE_JSON)

  // Return res.json() with the values defined
  return this.json({ status, message, data, metadata })
}

const jsonUnauthorized = function (data, message, metadata) {
  const status = STATUS_CODE_UNAUTHORIZED

  message = message ? message : 'Unauthorized!'
  metadata = metadata ? metadata : {}

  // Define res status to 200
  this.status(status)
  // Define res header to 'application/json'
  this.type(TYPE_JSON)

  // Return res.json() with the values defined
  return this.json({ status, message, data, metadata })
}

const jsonNotFound = function (data, message, metadata) {
  const status = STATUS_CODE_NOT_FOUND

  message = message ? message : 'Not found!'
  metadata = metadata ? metadata : {}

  // Define res status to 200
  this.status(status)
  // Define res header to 'application/json'
  this.type(TYPE_JSON)

  // Return res.json() with the values defined
  return this.json({ status, message, data, metadata })
}

const jsonServerError = function (data, message, metadata) {
  const status = STATUS_CODE_SERVER_ERROR

  message = message ? message : 'Server error!'
  metadata = metadata ? metadata : {}

  // Define res status to 200
  this.status(status)
  // Define res header to 'application/json'
  this.type(TYPE_JSON)

  // Return res.json() with the values defined
  return this.json({ status, message, data, metadata })
}

// Middleware for APIs to return better standardized res.json()
const response = (req, res, next) => {
  res.jsonOK = jsonOK
  res.jsonBadRequest = jsonBadRequest
  res.jsonUnauthorized = jsonUnauthorized
  res.jsonNotFound = jsonNotFound
  res.jsonServerError = jsonServerError

  next()
}

module.exports = response
