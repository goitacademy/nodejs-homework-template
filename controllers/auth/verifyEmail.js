const { errorHandler } = require('../../helpers');
const { User } = require('../../schema');

async function verifyEmail(req, res, next) {
    try {
        const { verificationToken } = req.params;
        const user = await User.findOne({ verificationToken });
        if (!user) {
            throw errorHandler(404, 'User not found');
        }
        await User.findByIdAndUpdate(user._id, {
            verify: true,
            verificationToken: '',
        });

        res.status(200).json({
            message: 'Verification successful',
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { verifyEmail };
