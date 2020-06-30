const Joi = require('@hapi/joi')
const { getValidatorError } = require('../helpers/validator')


const rules = {
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
  password_confirmation: Joi.string().valid(Joi.ref('password')).required()
}

const accountSignIn = (req, res, next) => {
  const { email, password } = req.body

  // Set rules to be used in validation
  const schema = Joi.object({
    email: rules.email,
    password: rules.password
  })

  // Validate rules with variables passed by request body
  const { error } = schema.validate({
    email, password
  }, {
    abortEarly: false // Prevent from stopping after first validation error
  })

  // If any error, return bad request
  if (error) {
    const errorMessages = getValidatorError(error, 'account.signin')

    return res.jsonBadRequest(null, null, { error: errorMessages })
  }

  next()
}

const accountSignUp = (req, res, next) => {
  const { email, password, password_confirmation } = req.body

  const schema = Joi.object({
    email: rules.email,
    password: rules.password,
    password_confirmation: rules.password_confirmation
  })

  const { error } = schema.validate({
    email, password, password_confirmation
  }, {
    abortEarly: false // Prevent from stopping after first validation error
  })

  if (error) {
    const errorMessages = getValidatorError(error, 'account.signup')

    return res.jsonBadRequest(null, null, { error: errorMessages })
  }

  next()
}

module.exports = { accountSignUp, accountSignIn }
