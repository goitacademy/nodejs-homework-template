const User = require('../../schemas/User')

const registerUser = async (body) => {
  try {
    const user = await User.findOne({ email: body.email })
    if (user) {
      return null
    }
    return await User.create(body)
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { registerUser }
