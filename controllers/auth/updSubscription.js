const { User } = require('../../models/user')

const updSubscription = async (req, res) => {
  const { subscription, _id } = req.user
  const user = await User.findByIdAndUpdate(_id, { ...req.body }, { new: true })
  if (subscription === req.body.subscription) {
    res.json({
      status: 'succes',
      code: 200,
    })
  }
  res.status(200).json(user)
}
module.exports = updSubscription
