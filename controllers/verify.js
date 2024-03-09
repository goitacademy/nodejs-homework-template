const { User } = require("../models/schema");
const { sendMail } = require("../models/verifyMail");

const verify = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({
        status: "error",
        code: 404,
        message: "Missing required field email",
        });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({
        status: "error",
        code: 400,
        message: "User whit this email does not exist",
        });
    }
    if (user.verify) {
        return res.json({
        status: "error",
        code: 400,
        message: "User has been verified",
        });
    }
    try {
        await sendMail(user.email, user.verificationToken, true);
        res.json({
        status: "success",
        code: 200,
        data: {
            id: user._id,
            email: user.email,
            verificationToken: user.verificationToken,
        },
        message: "Verification email sent",
        });
    } catch (error) {
        res.json({
        status: "error",
        code: 400,
        message: "Bad Request",
        });
    }
};

module.exports = { verify };
