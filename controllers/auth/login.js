const { NotFound, BadRequest } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')
const bcrypt = require('bcrypt')
const { User } = require('../../models')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, '_id email password')
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new BadRequest('Invalid email or password')
    // res.status(404).json({
    //   status: 'error',
    //   code: 404,
    //   message: `Email ${email} not found`,
    // })
    // if (!bcrypt.compareSync(password, user.password)) {
    //   throw new BadRequest('Invalid password')
    //   res.status(400).json({
    //     status: 'error',
    //     code: 400,
    //     message: 'Invalid password',
    //   })
    // }
  }
  const token = 'dfdsfdsf.dfdsffdd.ddddddd'
  res.json({
    status: 'success',
    code: 200,
    data: { token },
  })
}

module.exports = login
