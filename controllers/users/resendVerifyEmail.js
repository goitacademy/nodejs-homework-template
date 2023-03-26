const { User } = require("../../models/user");
const sendEmail = require("../../helpers/sendEmail")

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404).json({
            status: "Error",
            code: 404,
            message: "Not found"
        })
    }
    if (user.verify) {
        res.status(400).json({
            status: "Error",
            code: 400,
            message: "User already verify"
        })
    }
    const mail = {
            to: email,
            subject: "Підтвердження email",
            html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Підтвердити email</a>`
    }
    await sendEmail(mail);
    res.json({
        message: "Email verify resend"
    })
}

module.exports = resendVerifyEmail;