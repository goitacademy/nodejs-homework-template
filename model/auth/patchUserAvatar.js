// const User = require('../../schemas/User')

const patchUserAvatar = async (user, sub) => {
  try {
    // const result = await User.findByIdAndUpdate(user._id, { subscription: sub }, { returnDocument: 'after' })
    // return { email: result.email, subscription: result.subscription }
  } catch (err) {
    // console.log(err.message)
  }
}

module.exports = { patchUserAvatar }
