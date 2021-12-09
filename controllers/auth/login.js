const { User } = require('../../models')
const { Unauthorized } = require('http-errors')
const bcrypt 

const login = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  
}

module.exports = login
