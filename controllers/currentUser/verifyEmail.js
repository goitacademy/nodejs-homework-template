const {User} = require("../../models");


const verifyEmail = async (req, res) => {
    const {verificationToken } = req.params;
    const user = await User.findOne({verificationToken});
    if (!user) {
        res.status(404).json({message: "User not found"});

    }
    await user.findByIdAndUpdate(user._id, {verify: true, verificationToken: null});
    res.status(200).json({message: 'Verification successful'});
}

module.exports = verifyEmail;