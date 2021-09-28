const bcrypt = require('bcryptjs')
const { User } = require('../../schemas/user')
const { sendResponse } = require('../../helpers')

const register = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await User.findOne({ email })
    if (result) {
      sendResponse({
        res,
        status: 409,
        statusMessage: 'error',
        data: { message: 'Already register' },
      })
      return
    }
    const newUser = {
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    }

    await User.create(newUser)
    sendResponse({
      res,
      status: 201,
      data: { message: 'Success register' },
    })
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = register
