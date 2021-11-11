const User = require('../../schemas/User')
const bcrypt = require('bcryptjs')

const registerUser = async (body) => {
  try {
    const { email, password, subscription, token } = body
    const user = await User.findOne({ email })
    if (user) {
      return null
    }
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    return await User.create({ email, password: hashedPassword, subscription, token })
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { registerUser }
