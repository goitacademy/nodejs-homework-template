// контролер реєстрації користувача
// добавити властивість avatarURL(для зберігання зображення)


const { basedir } = global;

const service = require(`${basedir}/services/auth`);

const { schemas } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);

const signup = async (req, res) => {
    const { error } = schemas.register.validate(req.body);

    if (error) {
        throw createError(400, error.message);
    }

    const { username, email, password } = req.body;

    const result = await service.signup({ username, email, password });

    if (!result) {
        throw createError(409, `User with this ${email} in exists`);
    }

    res.json({
        status: 'Success',
        code: 201,
        message: 'Registration success',
        data: {
            user: {
                email: result.email,
                subscription: result.subscription,
                avatarURL: result.avatarURL,
            },
        },
    });
};

module.exports = signup;