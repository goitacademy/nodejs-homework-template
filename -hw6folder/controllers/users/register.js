// const bcrypt = require("bcryptjs");
// const { v4 } = require("uuid");
const { Conflict } = require('http-errors')

const { sendMail } = require('../../utils')
const { User } = require('../../models')

const register = async (req, res,) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Already register') // або
    // return res.status(409).json({
    //   status: "Conflict",
    //   message: "Email in use",
    // })
  }

  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // const result = await User.create({email, password: hashPassword});

  // const newUser = new User({email, verificationToken: v4()});

  // const newUser = new User({ email, verificationToken: v4() })
  const newUser = new User({ email })
  newUser.createVerificationToken()
  newUser.setPassword(password)

  // const { verificationToken } = newUser
  // console.log('email:', email)
  // console.log('verificationToken:', verificationToken)
  // const data = {
  //     to: email,
  //     subject: 'Registration confirmation',
  //     html: `<a href="http://localhost:3000/api/v1/users/verify/${verificationToken}">Please confirm your registration</a>`,
  // }

  // //const result = await sendMail(email)
  // await sendMail(data)

  await newUser.save()

  const { verificationToken } = newUser
  console.log('email:', email)
  console.log('verificationToken:', verificationToken)
  const data = {
    to: email,
    subject: 'Registration confirmation',
    html: `<a href="http://localhost:3000/api/v1/users/verify/${verificationToken}">Please confirm your registration</a>`,
  }

  // const result = await sendMail(email)
  await sendMail(data)

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register', // html: `<a href="http://localhost:3000/api/v1/users/verify/${verificationToken}">Please confirm your registration</a>`,
  })
}

module.exports = register
