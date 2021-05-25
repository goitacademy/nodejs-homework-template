const Users = require('../../model/user.model')
const handlerError = require('../../middlewares/notFound')

function logout(req, res) {
  const { id } = req.user

  Users.findByIdAndUpdate(id, { token: '' }, { new: true }, (err, data) => {
    if (err) return handlerError(res, err)

    console.log('data', data)

    if (data.token.length === 0) { res.status(200).json({ message: 'Logout successful' }) }
  })
}

module.exports = logout
