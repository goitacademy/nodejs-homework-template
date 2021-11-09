const User = require('../../schemas/User')
const bcrypt = require('bcryptjs')

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
    const token = 'dfgdfgdfd.dgdgdgdfg.dgfdgdgdf'
    return token
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { loginUser }
