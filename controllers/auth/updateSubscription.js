const { basedir } = global;

const service = require(`${basedir}/services/auth`);

const { schemas } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);

const updateSubscription = async (req, res) => {
    const { error } = schemas.register.validate(req.body);

    if (error) {
        throw createError(400, 'Missing field subscription');
    }

    const { _id: id } = req.user;
    const { subscription } = req.body;

    const result = await service.patch({ id, subscription });

    if (!result) {
        throw createError(404, 'Not found');
    }

    return res.json({
        status: 'Success',
        code: 200,
        message: 'Subscription successful',
        data: {
            result,
        },
    });
};

module.exports = updateSubscription;