const User = require('../../schemas/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginUser = async (body) => {
  try {
    const { email, password } = body
    const user = await User.findOne({ email })
    if (!user) {
      return null
    }
    const hashedPassword = user.password
    const compareResult = bcrypt.compareSync(password, hashedPassword)
    if (!compareResult) {
      return null
    }
    const payload = {
      id: user._id
    }
    const { SECRET_KEY } = process.env
    const token = jwt.sign(payload, SECRET_KEY)

    await User.findByIdAndUpdate(user._id, { token })

    return token
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { loginUser }
