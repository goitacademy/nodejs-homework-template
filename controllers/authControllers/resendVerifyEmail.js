const User = require('../../models/users');
const { HttpError, sendEmail } = require('../../helpers');
const { use } = require('../../app');

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(400, "missing required field email");
    }
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }
    const verifyEmail = {
        to: email,
        subject: "Verify your email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click to verify your email</a>`
    }    

    await sendEmail(verifyEmail);

    res.json({
        message: 'Verification message resend'
    })
}

module.exports = resendVerifyEmail;