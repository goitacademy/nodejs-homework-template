const model = require('../../model/users')

const verifyUser = async token => {
  try {
    const find = await model.findOne({ verifyToken: token })
    if (find) {
      await find.updateOne({ verify: true, verifyToken: null })
      return true
    }
    return false
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = verifyUser