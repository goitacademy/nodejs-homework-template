const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../db/userModel')
const { NotAuthorizedError } = require('../helpers/errors')

const userRegistration = async (email, password) => {
  const newUser = new User({ email, password })

  await newUser.save()
  const user = await User.findById(
    { _id: newUser._id },
    { subscription: 1, email: 1, _id: 0 },
  )
  return user
}
const userLogin = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotAuthorizedError('Email or password is wrong')
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError('Email or password is wrong')
  }
  const token = jwt.sign(
    { _id: user._id, subscrition: user.subscription, email: user.email },
    process.env.JWT_SECRET,
  )
  user.token = token
  await user.save()
  // const returnedUser = user.project({ email: 1, subscription: 1 })
  const loggedInUser = await User.findById(
    { _id: user._id },
    { subscription: 1, email: 1, _id: 0 },
  )
  return {
    token,
    // returnedUser
    loggedInUser,
  }
}

const userLogOut = async _id => {
  const user = await User.findById({ _id })
  user.token = null
  await user.save()
}

const getCurrentUser = async _id => {
  const user = await User.findOne(
    { _id },
    { subscription: 1, email: 1, _id: 0 },
  )
  return user
  // .project({ email: 1, subscription: 1 })
}

module.exports = {
  userRegistration,
  userLogin,
  userLogOut,
  getCurrentUser,
}
