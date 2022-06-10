const model = require('../../schemas/user')

const updateUserSubscription = async (userId, body) => {
  try {
    const data = await model.findByIdAndUpdate({ _id: userId }, body, {
      new: true,
    })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = updateUserSubscription