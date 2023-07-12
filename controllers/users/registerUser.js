const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const { sendEmail } = require('../../helpers');

require('dotenv').config();
const { BASE_URL } = process.env;

const {HttpError} = require("../../helpers");
const { User } = require("../../models/user/index");

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, `User with ${email} email already exist`)
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const { nanoid } = await import('nanoid');
    const verificationToken = nanoid();

    const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
        avatarURL,
        verificationToken,
        verify: false,
    });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a 
        target="_blank"
        href="${BASE_URL}/api/users/register/verify/${verificationToken}"
        >Click verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
        email: newUser.email,
        name: newUser.name,
        subscription: newUser.subscription,
        avatarURL,
        verify: newUser.verify,
        verificationToken,
    }})
}

module.exports = registerUser;