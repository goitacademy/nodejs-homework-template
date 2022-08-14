const {User} = require('../../models')
const {Conflict} = require("http-errors")
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const {sendEmail} = require('../../helpers')
const {nanoid} = require("nanoid")

const signUp = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw new Conflict( "Email in use")
    }
    const avatarUrl = gravatar.url(email)
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const verificationToken = nanoid()
    const result = await User.create({email, password: hashPassword, avatarUrl, verificationToken})
    
    const mail = {
        to: email, 
        subject: "Потдверждения email", 
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Verify email</a>`
}
    await sendEmail(mail)
    res.status(201).json({
        "user": {
            "email": email,
            "subscription": result.subscription,
            "avatarUrl": avatarUrl,
            "verificationToken": verificationToken
        }
    })
}

module.exports = signUp