const User = require("../../models/users");
const HttpError = require("../../helpers/HttpError");
const sendEmail = require("../../helpers/SendEmail");

const resendEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(404, "Not found")
    }
    if (user.verify) {
         throw HttpError(400, "Verification has already been passed")
    }
    const mail = {
        to: email,
        subject: "Website registration confirmation",
        html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Click to confirm email</a>`
    };
    await sendEmail(mail);
    res.status(200).json({
        status: "OK",
        code: 200,
        ResponseBody: {
        message: "Verification email sent"
}
    })
}

module.exports = resendEmail;