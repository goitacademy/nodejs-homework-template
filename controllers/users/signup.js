
const { User } = require('../../models');
const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require("gravatar");
const { sendEmail } = require("../../helpers");
const {v4} = require('uuid');
const signup = async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({email})
    if (user) {
        throw new Conflict("Email in use")
    }
  const verificationToken = v4()
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(11))
  const avatarURL = gravatar.url(email)
  const result = await User.create({ email, password: hashPassword, avatarURL, verificationToken })

  const mail = {
    to: email,
    subject: "Подтверждение email",
    html:`<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Нажмите для подверждения<a/>`
  }
  await sendEmail(mail)

  
    res.status(201).json({
        status: 201 ,

  user: {
    "email": email,
    "subscription": result.subscription,
    avatarURL,
    verificationToken
  }
})
} 
module.exports = signup