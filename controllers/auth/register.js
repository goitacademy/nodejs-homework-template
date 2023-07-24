const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { User, schemaJoiUser } = require('../../schema');
const { errorHandler, sendEmail } = require('../../helpers');
const { BASE_URL } = process.env;

const { registerSchema } = schemaJoiUser;

async function register(req, res, next) {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            throw errorHandler(400, 'Ошибка от Joi или другой библиотеки валидации');
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw errorHandler(409, 'Email in use');
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email);
        const verificationToken = nanoid();

        const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

        const verifyEmail = {
            to: email,
            subject: 'Verify your email',
            html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify Email</a>`,
        };

        await sendEmail(verifyEmail);

        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: 'starter',
            },
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { register };
