const validator = require('validator')
const gravatar = require('gravatar')
const { v4 } = require('uuid')
const sendGrid = require('@sendgrid/mail')
const User = require('../schemas/user')

sendGrid.setApiKey(process.env.SG_API_KEY)

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
    const verificationToken = v4()
    const newUser = new User({ email, avatarURL, verificationToken })
    newUser.setPassword(password)
    const user = await newUser.save()
    const message = {
      to: email,
      from: 'dmicher911@gmail.com',
      subject: 'Verification letter',
      html: `<p>Follow the link below to complete your account verification</p>
      <a href="http://localhost:3000/api/users/verify/${verificationToken}">Verification link</a>`,
    }
    sendGrid.send(message).catch(error => {
      throw error
    })
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
