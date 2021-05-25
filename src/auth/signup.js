const bcrypt = require('bcrypt')

const Users = require('../../model/user.model')
const handlerError = require('../../middlewares/notFound')

function signup(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(422).json({ message: 'Missing required fields' })
    return
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) handlerError(res, err)
    const newUsers = new Users({
      email,
      password: hash,
    })
    Users.findOne({ email })
      .then(data => {
        if (data) {
          res.status(409).json({ message: 'Email in use' })
          return
        }
        newUsers
          .save()
          .then(data => res.status(200).json({ data }))
          .catch(err => handlerError(res, err))
      })
      .catch(err => {
        console.log('err', err)
        handlerError(res, err)
      })
  })
}

module.exports = signup
