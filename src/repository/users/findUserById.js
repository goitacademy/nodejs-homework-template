const model = require('../../model/users')

const findUserById = async id => {
  try {
    const data = await model.findById(id)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = findUserById