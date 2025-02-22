const User = require('../../models/user');

const verify = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const isVerificationToken = await User.findOneAndUpdate({ verificationToken }, { verify: true, verificationToken: null });
        if (!isVerificationToken) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }
        return res.status(200).json({ status: "success", message: "Verification successful" })
    } catch (error) {
        next(error)
    }

};

module.exports = verify;