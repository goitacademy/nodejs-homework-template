const User = require('../../model/users')

const signupUser = async (body, verifyToken) => {
  try {
    const user = new User({ ...body, verifyToken })
    return await user.save()
  } catch (error) {
    console.error(error)
    throw error
  }
}
module.exports = signupUser