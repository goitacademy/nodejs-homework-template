const User = require('../../schemas/user')

const createUser = async body => {
  try {
    const user = new User(body)
    return await user.save()
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = createUser