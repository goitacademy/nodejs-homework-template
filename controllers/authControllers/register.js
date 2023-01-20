const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const {nanoid} = require("nanoid")

const { Conflict } = require('http-errors');
const { sendEmail } = require("./../../helpers")

const {BASE_URL} = process.env

const register = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`User with ${email} is already exist`)
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);
    const verificationCode = nanoid();

    result = User.create({ email, password: hashPassword, subscription, avatarURL, verificationCode });

    const verifyEmail = {
        to: email,
        subject: "Verify your email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify your email</a>`
    }    

    await sendEmail(verifyEmail);

    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            user:{ email, password, subscription }
        }
    })
}

module.exports = register