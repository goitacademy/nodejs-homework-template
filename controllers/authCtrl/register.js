const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { User } = require('../../models/user');
const { HttpError, sendMail } = require('../../helpers');
const { schemas: { registrationSchema } } = require('../../models/user');
const gravatar = require('gravatar');
const crypto = require('crypto');

const register = asyncHandler(async (req, res, next) => {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
        next(HttpError(400, error.message));
    };

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email is already in use")
    };
    const passwordHash = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email);
    const verificationToken = crypto.randomUUID()

    const newUser = await User.create({ ...req.body, password: passwordHash, avatarURL, verificationToken });

    const verifyEmail = {
        to: email,
        subject: "Verification",
        html: `<a target="_blank" rel="noopener noreferrer" href='http://localhost:3000/api/users/verify/${verificationToken}'>Click here</a>`
    };

    await sendMail(verifyEmail);


    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL: newUser.avatarURL
        }
    });


});

module.exports = register;