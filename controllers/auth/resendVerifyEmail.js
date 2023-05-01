const { User } = require('../../models/user');
const { NotFound, BadRequest } = require('http-errors');

const BASE_URL = process.env.BASE_URL || 'http://localhost';
const PORT = process.env.PORT || 3000;

const url = `${BASE_URL}:${PORT}`;

const { sendEmail } = require('../../helpers/');

const resendVerifyEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new NotFound('User not found');
        }

        if (user.verify) {
            throw new BadRequest('Verification has already been passed');
        }

        const verifyEmail = {
            to: email,
            subject: 'Verify email',
            html: `<a target="_blank" href="${url}/users/verify/${user.verificationToken}">Click to verify your email</a>`,
        };

        await sendEmail(verifyEmail);

        res.json({ message: 'Verify email send success' });
    } catch (error) {
        next(error);
    }
};

module.exports = resendVerifyEmail;
