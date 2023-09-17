const asyncHandler = require('express-async-handler');
const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');



const verifyEmail = asyncHandler(async (req, res, next) => {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });
    
    if (user === null) {
        throw HttpError(404, 'User not found');
    };

    await User.findOneAndUpdate({ verificationToken }, { verificationToken: '', verify: 'true' });

    res.status(200).json("Verification successful")
});

module.exports = verifyEmail;