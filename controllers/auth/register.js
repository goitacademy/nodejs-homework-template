const { Conflict } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')
const bcrypt = require('bcrypt')
const { User } = require('../../models')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    // throw new Conflict('Already register')
    res.status(409).json({
      ststus: 'error',
      code: 409,
      message: 'Already register',
    });
  }
//   const newUser = new User({email})
//   newUser.setPassword(password)
//   const result = await newUser.save()
const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
const newUser={email, password: hashPassword}
const compareResult = bcrypt.compareSync(password,hashPassword)
console.log(compareResult);
  const result = await User.create(newUser)
  console.log(result)
  sendSuccessRes(res, { result })
  //   res.status(201).json({
  //       status: 'success',
  //       code: 201,
  //       message: "Success register"
  //   })
}

module.exports = register
