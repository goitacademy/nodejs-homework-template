const model = require('../../model/users')

const updateUserToken = async (id, token) => {
  try {
    const data = await model.updateOne({ _id: id }, { token })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = updateUserToken