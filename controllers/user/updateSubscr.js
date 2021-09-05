const { User } = require('../../model')

const updateSubscr = async (req, res, next) => {
  try {
    const { subscription } = req.body

    if (!subscription) {
      return res.status(400).json({
        message: 'Missing field subscription'
      })
    }

    if (subscription !== 'pro' && subscription !== 'business' && subscription !== 'starter') {
      return res.status(400).json({
        message: 'Not correct field name'
      })
    }

    const updateUser = await User.findByIdAndUpdate(req.user._id, { subscription }, { new: true })
    
    if (!updateUser) {
      return res.status(404).json({
        message: 'Not found'
      })
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        result: updateUser
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateSubscr