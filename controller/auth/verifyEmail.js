const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) {
        throw RequestError(404, "Not found");
    }

    await User.findByIdAndUpdate(user._id, { verificationToken: null, verify: true });

    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            message: "Verification successful",
        },
    });
};

module.exports = verifyEmail;
