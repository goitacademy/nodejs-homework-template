const { User } = require('../../model')

const getOne = async (req, res, next) => {
  try {
    const result = await User.finfOne({ email: req.body.email })
    if (result) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Already register'
      })
    }
  } catch (error) {

  }
}

module.exports = getOne;
