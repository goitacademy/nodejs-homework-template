// created by Irina Shushkevych
const { userSchema } = require('../../models')

const logout = async (req, res) => {
  const {id} = req.user
  await userSchema.User.findByIdAndUpdate(id, {token:null})
  res.status(204).json({
    status: "ok",
    code: 204
  })
}

module.exports = logout