const { errorHandler, sendEmail } = require('../../helpers');
const { User, schemaJoiUser } = require('../../schema');

const { verifySchema } = schemaJoiUser;
const { BASE_URL } = process.env;

async function resendVerifyEmail(req, res, next) {
    try {
        const { error } = verifySchema.validate(req.body);
        if (error) {
            throw errorHandler(400, 'Ошибка от Joi или другой библиотеки валидации');
        }

        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw errorHandler(404, 'User not found');
        }
        if (user.verify) {
            throw errorHandler(400, 'Verification has already been passed');
        }

        const verifyEmail = {
            to: email,
            subject: 'Verify your email',
            html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify Email</a>`,
        };

        await sendEmail(verifyEmail);

        res.status(200).json({
            message: 'Verification email sent',
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { resendVerifyEmail };
