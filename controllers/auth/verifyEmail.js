const { User } = require('../../models/user');
const { NotFound, BadRequest } = require('http-errors');

const verifyEmail = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = await User.findOne({ verificationToken });
        if (!user) {
            throw new NotFound('User not found');
        }
        const result = await User.findByIdAndUpdate(user._id, {
            verify: true,
            verificationToken: '',
        });
        if (!result) {
            throw new BadRequest('Email not verified!');
        }
        res.json({ message: 'Verification successful' });
    } catch (error) {
        next(error);
    }
};

module.exports = verifyEmail;
