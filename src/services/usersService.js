const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Users } = require('../db/usersModel')
const { NotAuthorizedError, RegistrationConflictError } = require('../helpers/errors')


const signup = async ({ password, email, subscription }) => {
  const isEmailBooked = await Users.findOne({ email })

  if (isEmailBooked) {
    throw new RegistrationConflictError(`User with ${email} is already exists.`)
  }

  const newUser = new Users({ password, email, subscription })
  
  await newUser.save()
}

const login = async ({password, email}) => {
  const user = await Users.findOne({ email })

  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new NotAuthorizedError("No user found. The email or password may be incorrect.")
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

const checkCurrentUser = async (authorization) => {
  if (!authorization) {
    throw new NotAuthorizedError("Please provide a token.")
  }

  const [tokenType, token] = authorization.split(" ")
  if (tokenType !== 'Bearer') {
    throw new NotAuthorizedError("Invalid token type.")
  }

  const user = await Users.findOne({ token })
    .select({ password: 0, "__v": 0 })
  
  if (!user) {
    throw new NotAuthorizedError("Invalid token.")
  }

  return user
}

const switchSubscription = async ({ email, subscription }) => {
  const user = await Users.findOneAndUpdate({email}, {$set: {subscription}})
  
  if (!user) {
    throw new NotAuthorizedError("No user found.")
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkCurrentUser,
  switchSubscription
}