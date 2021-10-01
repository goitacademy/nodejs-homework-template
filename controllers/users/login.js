const { User } = require('../../models')

const { BadRequest } = require('http-errors')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, '_id email password')
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Invalid email or password')
  }

  const token = 'ghsdfsdfsfg.hsgfdhdghdh.dfgdhdhsdsasa'
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  })
}
module.exports = login
