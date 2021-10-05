const { User } = require('../../models');

const current = async (req, res) => {
    const { _id } = req.user;
  const result = await User.findById(_id)
  // console.log(result)
  if (result) {
    res.json({email: result.email, subscription: result.subscription})
  }
}

module.exports = current