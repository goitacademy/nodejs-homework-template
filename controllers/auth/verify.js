const { User } = require("../../models/user")
const { HttpError } = require("../../helpers")


const verify = async (req, res)=> {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw HttpError(404)
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });

    res.joson({
        message: "Email verify success"
    })
};

module.exports = verify;