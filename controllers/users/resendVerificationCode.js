const { HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");

require("dotenv").config();
const { BASE_URL } = process.env;

const resendVerificationCode = async(req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, 'User with this email dosen`t exist')
    }
    if (user.verify) {
        throw HttpError(400, 'Verification has already been passed')
    };

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a 
        target="_blank"
        href="${BASE_URL}/api/users/register/verify/${user.verificationToken}"
        >Click verify email</a>`
    };
    await sendEmail(verifyEmail);

    res.json({ message: "Verify email send success" });
}

module.exports = resendVerificationCode;