const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, schemaJoiUser } = require('../../schema');
const { errorHandler } = require('../../helpers');

const { loginSchema } = schemaJoiUser;

const { SECRET_WORD } = process.env;

async function login(req, res, next) {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            throw errorHandler(400, 'Ошибка от Joi или другой библиотеки валидации');
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw errorHandler(401, 'Email or password is wrong');
        }

        if (!user.verify) {
            throw errorHandler(401, 'Email is not verified');
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            throw errorHandler(401, 'Email or password is wrong');
        }

        const payload = { id: user._id };
        const token = jwt.sign(payload, SECRET_WORD, { expiresIn: '23h' });

        await User.findByIdAndUpdate(user._id, { token });

        res.status(200).json({
            token: token,
            user: {
                email: user.email,
                subscription: user.subscription,
            },
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { login };
