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

const addUser = async (body) => {
  try {
    // const response = await User.create(body)
    const response = body
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

const updateToken = async (userId, token) => {
  const updatedToken = await User.findByIdAndUpdate(
    { _id: userId },
    { token }
  )
  return updatedToken
}

module.exports = {
  getuserById,
  getuserByEmail,
  addUser,
  updateSubscriptionUser,
  updateToken
}
