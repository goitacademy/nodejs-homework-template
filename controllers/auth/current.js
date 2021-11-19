const { User } = require('../../models')

const current = async (req, res) => {
  const { _id } = req.user
  await User.findById(_id)

  res.json({
    status: 'success',
    code: 200,
    data: {
      email: req.user.email,
      subscription: 'starter',
    },
  })
}

// const current = async (req, res) => {
//   try {
//     const { _id } = req.user
//     await User.findById(_id)
//     res.json({
//       status: 'success',
//       code: 200,
//       data: {
//         email: req.user.email,
//         subscription: 'starter',
//       },
//     })
//   } catch (error) {
//     res.json({
//       status: 'unauthorized',
//       code: 401,
//       message: 'Not authorized',
//     })
//   }
// }

module.exports = current
