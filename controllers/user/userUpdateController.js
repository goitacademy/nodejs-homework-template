const { updateUserSubscription } = require('../../model/users/index')

const updateUserController = async (req, res, next) => {
  const body = req.body
  const { _id } = req.user
  if (!body.subscription) {
    return res.status(404).json({ message: 'missing fields' })
  }
  if (body.subscription !== 'starter' && body.subscription !== 'pro' && body.subscription !== 'business') {
    return res.status(404).json({ message: 'wrong type subscription' })
  }
  await updateUserSubscription(_id, body)
  res.status(200).json({ message: 'success' })
}

module.exports = { updateUserController }
