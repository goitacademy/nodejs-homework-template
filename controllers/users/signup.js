const { User } = require('../../models')
const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const signup = async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({email})
    if (user) {
        throw new Conflict("Email in use")
    }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(11))
    const result = await User.create({ email, password : hashPassword })
    res.status(201).json({
        status: 201 ,

  user: {
    "email": email,
    result
  }
})
}
module.exports = signup