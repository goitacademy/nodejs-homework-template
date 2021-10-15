const { User } = require('../../models/user')
const { BadRequest, NotFound } = require('http-errors')

const updateUserSubscription = async (req, res, next) => {
  const { userId } = req.params
  const { subscription } = req.body
  if (!subscription) {
    throw new BadRequest('missing field subscription')
  }
  const result = await User.findByIdAndUpdate(userId, { subscription }, { new: true })
  if (!result) {
    throw new NotFound(`User with id=${userId} not found`)
  }

  res.json({
    status: 'success',
    code: 200,
    data: { result }
  })
}

module.exports = updateUserSubscription
