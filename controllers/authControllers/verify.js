const User = require('../../models/users');
const { HttpError } = require('../../helpers');

const verify = async(req, res) => {
    const { verificationCode } = req.params;
    console.log(verificationCode)
    const user = await User.findOne({ verificationCode });
    if (!user) {
        throw HttpError(404);
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationCode: "" });

    console.log(user.verify)
    res.json({
        message: "Email verified success"
    })
}

module.exports = verify