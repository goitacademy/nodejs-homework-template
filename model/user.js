const User = require('../schemas/user')

const getuserById = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId })
    return user
  } catch {
    return {}
  }
}

const getuserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email })
    return user
  } catch {
    return {}
  }
}

const getuserByToken = async (token) => {
  try {
    const modifiedToken = token.split(' ')
    console.log(modifiedToken)
    const user = await User.findOne({ token: modifiedToken[1] })
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      subscription: user.subscription,
      token: user.token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  } catch {
    return {}
  }
}

const addUser = async (body) => {
  try {
    const response = await User.create(body)
    return response
  } catch {
    return {}
  }
}

const updateSubscriptionUser = async (userId, body) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { ...body },
      { new: true }
    )
    return updatedUser
  } catch {
    return {}
  }
}

module.exports = {
  getuserById,
  getuserByEmail,
  addUser,
  updateSubscriptionUser,
  getuserByToken
}
