const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const verifyEmail = async(req,res) => {
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken});

    if(!user) {
        throw HttpError(401, "User not found");
    }
    await User.findByIdAndUpdate(user._id, {
        verify:true,
        verificationToken: null,
    });

    res.status(200).json({
        messange: "Verfication successful",
    });

};

module.exports = verifyEmail;