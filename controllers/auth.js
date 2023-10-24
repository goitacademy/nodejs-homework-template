const HttpErr = require('../helpers/HttpErr');

const ctrlWrapper = require('../helpers/ctrlWrapper');

const { User, logRegSсhema } = require('../models/user');

const register = async (req, res) => {
    const newUser = User.create(req.body)
    res.json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
};

module.exports = {
    register: ctrlWrapper(register),

};