// контролер виходу користувача


const { basedir } = global;

const service = require(`${basedir}/services/auth`);

const { createError } = require(`${basedir}/helpers`);

const logout = async (req, res) => {
    const { _id: id } = req.user;

    const user = await service.logout({ id });

    if (!user) {
        throw createError(401, 'Not authorized');
    }

    return res.status(204, 'No Content').json();
};

module.exports = logout;