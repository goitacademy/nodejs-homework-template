const User = require('../../model/users')

const signupUser = async body => {
  try {
    const user = new User(body)
    return await user.save()
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = signupUser