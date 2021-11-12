const { BadRequest } = require('http-errors')

const { User } = require('../../models')

const subscription = async (req, res) => {
  if (req.body.subscription === 'starter' || req.body.subscription === 'pro' || req.body.subscription === 'business') {
    const subsc = req.body.subscription
    const user = await User.findByIdAndUpdate(req.user._id, { subscription: subsc }, { new: true })

    res.json({
      status: 'success',
      code: 200,
      data: {
        email: user.email,
        subscription: user.subscription
      }
    })
  }
  throw new BadRequest('Bad request')
}

module.exports = subscription
