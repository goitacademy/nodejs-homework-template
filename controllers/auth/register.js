const bcrypt = require("bcryptjs");

const gravatar = require("gravatar");

const {User} = require("../../models/user");

const {HttpError, sendMail} = require("../../helpers");

require("dotenv").config();

const {BASE_URL} = process.env;

const {nanoid} = require("nanoid")

const register = async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email})
    if(user) {
        throw HttpError(409,"Email in use");
    }
    
    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email);

    const verificationToken = nanoid();

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});
    const verifyEmail = {
        to:email,
        subject: "Verify email",
        html: `<a target = "_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`
    };
    await sendMail(verifyEmail);

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    })

}


module.exports = register;