const validator = require('validator')
const gravatar = require('gravatar')
const User = require('../schemas/user')

const validateUserFields = (email, password) => {
  let validationMessage = ''
  if (!validator.isEmail(email)) {
    validationMessage += 'Email validation failed. '
  }
  if (!validator.isStrongPassword(password)) {
    validationMessage += 'Password validation failed: min length - 8, min lowercase - 1, min uppercase - 1, min numbers - 1, min symbols - 1.'
  }
  return validationMessage.trim()
}

const registration = async body => {
  try {
    const { email, password } = body
    const avatarURL = gravatar.url(email, { protocol: 'https', s: '100' })
    const newUser = new User({ email, avatarURL })
    newUser.setPassword(password)
    const user = await newUser.save()
    return {
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    }
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

module.exports = {
  validateUserFields,
  registration,
}
