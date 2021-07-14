const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {uid} = require('uid')
const gravatar = require('gravatar');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { Users } = require('../db/usersModel')
const {
  NotAuthorizedError,
  RegistrationConflictError,
  NotVarifiedError,
  AlreadyVarifiedError
} = require('../helpers/errors')


const signup = async ({ password, email, subscription }) => {
  const isEmailBooked = await Users.findOne({ email })
  if (isEmailBooked) {
    throw new RegistrationConflictError(`User with ${email} is already exists.`)
  }
  const verifyToken = uid()
  const avatarURL = gravatar.url(email, { s: '250' }, true);
  const newUser = new Users({ password, email, subscription, avatarURL, verifyToken })
  await newUser.save()

  const msg = {
    to: email,
    from: 'nastya.polkovnikova99@gmail.com', 
    subject: 'Verify your email',
    text: `Thanks for singing up with Contacts App! You must follow this link to verify your email: 
    http://localhost:3000/api/users/verify/${verifyToken}`,
    html: `Thanks for singing up with Contacts App! You must follow this link to verify your email: 
    http://localhost:3000/api/users/verify/${verifyToken}`,
  }

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
}

const login = async ({password, email}) => {
  const user = await Users.findOne({ email })

  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new NotAuthorizedError("No user found. The email or password may be incorrect.")
  }

  if (!user.verify) {
    throw new NotVarifiedError("User is not verified")
  }

  const { _id, subscription } = user
  
  const token = jwt.sign({
    _id
  }, process.env.JWT_SECRET)
 
  await Users.findByIdAndUpdate(_id, {$set: {token}})

  return {
    token, user: {
      email,
      subscription
    }
  }
}

const logout = async (userId) => {
  await Users.findByIdAndUpdate(userId , {$set: {token: null}})
}

const checkCurrentUser = async (token) => {
  const user = await Users.findOne({ token })
    .select({ password: 0, "__v": 0 })

  return user
}

const switchSubscription = async ({ email, subscription }) => {
  const user = await Users.findOneAndUpdate({email}, {$set: {subscription}})
  
  if (!user) {
    throw new NotAuthorizedError("No user found.")
  }
}

const verify = async (verifyToken) => {
  const user = await Users.findOne({ verifyToken })
  if (!user) {
    throw new NotVarifiedError("User not found")
  }
  user.verifyToken = null
  user.verify = true
  await user.save()
}

const repeatedVerify = async (email) => {
  const user = await Users.findOne(email)
  if (user.verify) {
    throw new AlreadyVarifiedError('Verification has already been passed')
  }

  const verifyToken = user.verifyToken

  const msg = {
    to: email,
    from: 'anastasia_p_l@mail.ru', 
    subject: 'Verify your email',
    text: `Thanks for singing up with Contacts App! You must follow this link to verify your email: 
    http://localhost:3000/api/users/verify/${verifyToken}`,
    html: `Thanks for singing up with Contacts App! You must follow this link to verify your email: 
    http://localhost:3000/api/users/verify/${verifyToken}`,
  }

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkCurrentUser,
  switchSubscription,
  verify,
  repeatedVerify
}