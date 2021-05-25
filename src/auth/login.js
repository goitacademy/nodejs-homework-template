const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Users = require('../../model/user.model')
const { secretKey } = require('../../config')
const handlerError = require('../../middlewares/notFound')

function loginUser(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(401).json({ message: 'Email and password required field!' })
    return
  }

  Users.findOne({ email })
    .select('password subscription')
    .then(user => {
      if (!user) { return res.status(401).json({ message: 'User not found' }) }

      const { id } = user
      bcrypt.compare(password, user.password, (err, valid) => {
        if (err) throw err

        if (!valid) {
          return res
            .status(400)
            .json({ message: 'Login or password is wrong!' })
        }

        const token = jwt.sign({ id }, secretKey, { expiresIn: '60m' })

        Users.findByIdAndUpdate(
          id,
          { token },
          { new: true },
          (err, data) => {
            console.log('data', data)
            console.log('err', err)

            res.status(200).json({
              token: `Bearer ${data.token}`,
            })
          },
        )
      })
    })
    .catch(err => handlerError(res, err))
}

module.exports = loginUser
