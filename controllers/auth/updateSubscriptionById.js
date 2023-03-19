const { User } = require('../../models')

const updateSubscriptionById = async (req, res) => {
  const { _id } = req.user
  const { subscription } = req.body
  const result = await User.findByIdAndUpdate(_id, { subscription }, { new: true })

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = updateSubscriptionById