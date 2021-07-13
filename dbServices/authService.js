const { User } = require('../dbModels/userModel')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const registration = async (password, email, subscription) => {
  const avatarURL = gravatar.url(email)

  const user = new User({
    password: await bcrypt.hash(password, 10),
    email,
    subscription,
    avatarURL,
  })

  await user.save()
  const msg = {
    to: email,
    from: 'filiprulls2021@gmail.com', // Use the email address or domain you verified above
    subject: 'First Greeting',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  await sgMail.send(msg)
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
const verificationService = async (req, res) => {
  // const token = req.params.verificationtoken
}

module.exports = {
  registration,
  login,
  logout,
  changeAvatar,
  verificationService,
  getUsersService,
}
