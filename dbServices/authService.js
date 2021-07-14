const { User } = require('../dbModels/userModel')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const sha256 = require('sha256')

const nodemailer = require('nodemailer')

const registration = async (password, email, subscription) => {
  const avatarURL = gravatar.url(email)
  const verificationtoken = sha256(email)

  const user = new User({
    password: await bcrypt.hash(password, 10),
    email,
    subscription,
    avatarURL,
    verificationtoken,
  })

  await user.save()
  async function main() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: email,
        pass: password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    await transporter.sendMail({
      from: 'peacefilip1989@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Greetings ✔', // Subject line
      text: 'Please confirm your email adress', // plain text body
      html: `<b>Please confirm your email adress GET localhost:3001/api/users/verify/${verificationtoken}</b>`, // html body
    })
  }
  await main()
}
const login = async (email, password) => {
  let user = await User.findOne({
    email,
  })
  const rightPassword = await bcrypt.compare(password, user.password)
  if (rightPassword) {
    const createdAt = new Date()
    const token = jwt.sign(
      { _id: user._id, createdAt },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    )
    user.token = token
    user = await User.findOneAndUpdate(
      { email },
      {
        $set: user,
      },
    )
    user = await User.findOne({
      email,
    })
    return user.token
  }
  return rightPassword
}
const logout = async token => {
  let user = await User.findOneAndUpdate(
    { token },
    {
      $set: { token: null },
    },
  )
  user = await User.findById(user._id)
  return user.token
}
const changeAvatar = async (avatarURL, token) => {
  const user = await User.findOneAndUpdate(
    { token },
    {
      $set: { avatarURL },
    },
  )
  return user.email
}
const getUsersService = async () => {
  const users = await User.find({})
  return users
}
const verificationService = async req => {
  const user = await User.findOneAndUpdate(
    { verificationtoken: req.params.verificationtoken },
    {
      $set: { verify: true, verificationtoken: null },
    },
  )
  console.log(user)
  return user
}

module.exports = {
  registration,
  login,
  logout,
  changeAvatar,
  verificationService,
  getUsersService,
}
