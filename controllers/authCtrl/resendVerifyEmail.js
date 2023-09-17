const { HttpError, sendMail } = require("../../helpers");
const { User } = require("../../models/user");
const asyncHandler = require('express-async-handler');

const resendVerifyEmail = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(400, "missing required field email");
    };

    if (user.verify) {
        throw HttpError(400, "The verification has already been passed");
    };

    console.log(user.verificationToken);

    const verifyEmail = {
        to: email,
        subject: "Verification",
        html: `<a target="_blank" rel="noopener noreferrer" href='http://localhost:3000/api/users/verify/${user.verificationToken}'>Click here to verify your email</a>`
    };

    await sendMail(verifyEmail);

    res.status(200).json('Verification email sent')
})

module.exports = resendVerifyEmail;