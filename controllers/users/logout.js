const { Unauthorized } = require('http-errors');

const { User } = require('../../models');

const logout = async (req, res) => {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
        throw Unauthorized("Not authorized")
    }

    user.token = null;
    user.save();

    res.status(204).send();
};

module.exports = logout;