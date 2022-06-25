const model = require('../../model/users')

const findUserByEmail = async email => {
  try {
    const data = await model.findOne({ email })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = findUserByEmail