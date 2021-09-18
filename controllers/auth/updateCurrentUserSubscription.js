const { User } = require('../../model')

const updateCurrentUserSubscription = async (req, res) => {
  const { _id } = req.user
  const { subscription } = req.body

  if (!['starter', 'pro', 'business'].includes(subscription)) {
    return res.status(400).json({
      message: "subscription can be one of ['starter', 'pro', 'business']"
    })
  }

  const user = await User.findByIdAndUpdate(_id, { subscription }, { new: true })

  if (!user) return res.status(404).json({ message: 'Not found' })

  res.json({ user })
}

module.exports = updateCurrentUserSubscription
