const { User } = require('../../models/user');

const { HttpError, ctrlWrapper } = require('../../helpers');

const register = async (req, res) => {
    const newUser = await User.creare(req.body);

    res.json({
        enail: newUser.enail,
        subscription: newUser.subscription,
    });
};

module.exports = {
    register: ctrlWrapper(register),
};
