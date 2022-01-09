const {User} = require("../../models")

const {NotFound, BadRequest} = require("http-errors")

const {sendEmail} = require("../../helpers")

const resendEmail = async(req, res) => {
const {email} = req.body
const user = await User.findOne({email})

if(!user) {
throw NotFound("User with this email not registred")
}
if(user.verify) {
    throw BadRequest("Verification has already been passed")
}
const verificationToken = user.verificationToken

const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Подтвердите почту</a>`
  }

  sendEmail(mail)

  res.json({
      status: "succes",
      code: 200,
      message: "Verification email send"
  })

  
}

module.exports = resendEmail