// контролер входу користувача


const { basedir } = global;

const service = require(`${basedir}/services/auth`);

const { schemas } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);

const login = async (req, res) => {
    const { error } = schemas.login.validate(req.body);

    if (error) {
        throw createError(400, error.message);
    }

    const { email, password } = req.body;

    const { user, token } = await service.login({ email, password });

    if (!user) {
        throw createError(401, 'Email or password is wrong');
    }

    return res.json({
        status: 'Success',
        code: 200,
        message: 'Login successful',
        data: {
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            },
        },
    });
};

module.exports = login;