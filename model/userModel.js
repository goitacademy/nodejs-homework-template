const User = require('./schemas/schUser')

// const getCurrentUser = () => {}

const findUserById = async (id) => {
  try {
    const result = await User.findOne({ _id: id })
    return result
  } catch (error) {
    error.status = 400
    error.data = 'Bad request'
    throw error
  }
}

const findUserByEmail = async (email) => {
  try {
    const result = await User.findOne({ email })
    return result
  } catch (error) {
    error.status = 400
    error.data = 'Bad request'
    throw error
  }
}

const createUser = async ({ email, password }) => {
  const user = new User({ email, password })
  return user.save()
}

const updateUserToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token })
}

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateUserToken,
}
