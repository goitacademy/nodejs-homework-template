const model = require('../../model/users')

const updateUserAvatar = async (userId, avatar) => {
  try {
    const data = await model.findByIdAndUpdate({ _id: userId }, avatar, {
      new: true,
    })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = updateUserAvatar