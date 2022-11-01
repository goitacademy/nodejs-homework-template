const { User } = require("../../models/user")
const {NotFound} = require("http-errors")

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw NotFound();
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
    res.json({
        message: "Verify success" 
    })
}

module.exports = verifyEmail;