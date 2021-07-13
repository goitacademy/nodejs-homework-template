const { User } = require('../dbModels/userModel')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // const testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'brad.boehm@ethereal.email',
      pass: 'n1NnZEYJKHEuPZcpPd',
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'filiprulls2021@gmail.com', // sender address
    to: 'peacefilip1989@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error)

const registration = async (password, email, subscription) => {
  const avatarURL = gravatar.url(email)

  const user = new User({
    password: await bcrypt.hash(password, 10),
    email,
    subscription,
    avatarURL,
  })

  await user.save()
  await main()
  // const msg = {
  //   to: email,
  //   from: 'filiprulls2021@gmail.com', // Use the email address or domain you verified above
  //   subject: 'First Greeting',
  //   text: 'and easy to do anywhere, even with Node.js',
  //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  // }
  // await sgMail.send(msg)
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
